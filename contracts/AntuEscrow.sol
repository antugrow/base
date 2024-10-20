// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AntuEscrow is ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;

    struct Loan {
        address investor;
        uint256 amount;
        uint256 repaidAmount;
        uint256 dueDate;
        bool isActive;
    }

    IERC20 public token;
    uint256 public loanIdCounter;
    address public constant WALLET_ADDRESS = 0xEbD4562DAa2353532BcEb499ec29e37fc510856E;

    mapping(uint256 => Loan) public loans;
    mapping(address => uint256[]) public investorLoans;

    event LoanCreated(
        uint256 indexed loanId,
        address indexed investor,
        uint256 amount,
        uint256 dueDate
    );

    constructor(address _token) Ownable(msg.sender) {
        token = IERC20(_token);
    }

    function createLoan(uint256 _amount, uint256 _duration) external payable {
        require(_amount > 0, "Loan amount must be greater than 0");
        require(_duration > 0, "Loan duration must be greater than 0");

        uint256 amountInWei = _amount * (10 ** 18);

        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= _amount, "Insufficient token allowance");

        token.safeTransferFrom(msg.sender, WALLET_ADDRESS, amountInWei);

        uint256 loanId = loanIdCounter++;
        uint256 dueDate = block.timestamp + _duration;

        loans[loanId] = Loan({
            investor: msg.sender,
            amount: _amount,
            repaidAmount: 0,
            dueDate: dueDate,
            isActive: true
        });

        investorLoans[msg.sender].push(loanId);

        emit LoanCreated(loanId, msg.sender, _amount, dueDate);
    }
}