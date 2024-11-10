// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract Bank {
    mapping(address => uint) public balances;
    event Deposit(address indexed from, uint amount);
    event Withdraw(address indexed to, uint amount);

    function deposit() public payable {
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit Withdraw(msg.sender, amount);
    }
}
