// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

error AutoPass__WithdrawFailed();
error AutoPass__TransferFailed();

contract Autopass is ReentrancyGuard, Ownable {
    // mapping紀錄第三方地址總共收了多少錢
    //    擁有者錢包地址       第三方錢包地址  多少錢, 要不要把資料清掉 在想
    // mapping records how much money a third-party address has received in total
    // user wallet address(autoPass APP)   third-party suppleir address
    mapping(address => mapping(address => uint)) private thirdPartyReceive;

    // 當使用者消費時,前端呼叫此function,把花費的錢存入合約中
    // input參數從autoPass API讀取，使用者花費多少錢，e.g. 花費10 USD,加油站
    // thirdPartyPay = 10, address = 加油站錢包地址 (假設autopass的API會給這些資訊)
    // When the user spends money, the front-end calls this function to store the spent money in the contract.
    // The input parameters are read from the autoPass API, which shows how much money the user has spent, e.g. spending 10 USD at a gas station.
    // thirdPartyPay = 10, address = the gas station wallet address (assuming the autoPass API provides this information).
    function spendMoney(
        uint thirdPartyPay,
        address thirdPartyAddress
    ) external payable {
        require(msg.value >= thirdPartyPay);
        thirdPartyReceive[msg.sender][thirdPartyAddress] += thirdPartyPay;
    }

    // 輸入參數,用戶的錢包地址，第三方的錢包地址，就會回傳此用戶在這個商店消費多少錢
    // e.g.  輸入alice錢包地址 和中油錢包地址  就可以得知alice在中油花費了多少錢
    // By inputting a user's wallet address and a third-party wallet address, this function returns how much money the user has spent at this store.
    // For example, by inputting Alice's wallet address and the gas station's wallet address, we can find out how much Alice has spent at the gas station.
    function retrieve(
        address spender,
        address thirdPartyAddress
    ) public view returns (uint) {
        return thirdPartyReceive[spender][thirdPartyAddress];
    }

    //此function只能由autoPass的廠商自己呼叫,當用戶消費的金額存到此合約中，由autoPass廠商將金額提領出來
    //在透過autopass轉帳法幣給其他第三方合作商家，例如autoPass領錢後 轉給中油 用戶應付的費用
    // This function can only be called by the autoPass vendor themselves. When the amount that the user has spent is stored in this contract,
    // the autoPass vendor can withdraw the amount and use autoPass to transfer fiat currency to other third-party business partners,
    // such as transferring the amount to the gas station after autoPass has received it, to cover the user's fees.
    function withdrawProceeds() external nonReentrant onlyOwner {
        uint256 proceeds = address(this).balance;
        if (proceeds <= 0) {
            revert AutoPass__WithdrawFailed();
        }
        (bool success, ) = payable(msg.sender).call{value: proceeds}("");
        if (!success) {
            revert AutoPass__TransferFailed();
        }
    }

    //檢查合約中剩多少錢
    //Check how much money is left in the contract.
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    //待完成事項,要不要在合約領出錢之後,把用戶花費多少錢的資料清掉
    //Should we clear the data of how much money the user has spent after withdrawing the money from the contract?
}
