// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract APIValidator {
    struct APICall {
        address caller;
        string endpoint;
        uint256 timestamp;
        bytes32 requestHash;
    }
    
    mapping(bytes32 => APICall) public apiCalls;
    
    event APICallRecorded(
        address indexed caller,
        string endpoint,
        uint256 timestamp,
        bytes32 requestHash
    );
    
    function recordAPICall(
        string memory endpoint,
        bytes32 requestHash
    ) public {
        APICall memory newCall = APICall({
            caller: msg.sender,
            endpoint: endpoint,
            timestamp: block.timestamp,
            requestHash: requestHash
        });
        
        apiCalls[requestHash] = newCall;
        
        emit APICallRecorded(
            msg.sender,
            endpoint,
            block.timestamp,
            requestHash
        );
    }
    
    function verifyAPICall(bytes32 requestHash) 
        public 
        view 
        returns (bool, address, uint256) 
    {
        APICall memory call = apiCalls[requestHash];
        return (
            call.timestamp != 0,
            call.caller,
            call.timestamp
        );
    }
}