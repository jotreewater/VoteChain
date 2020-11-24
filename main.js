const SHA256 = require('crypto-js/sha256');

//Keeps track of each block
class Block{
    constructor(index, timestamp, data, previousHash= ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }
    //Uses data during a block's creation to generate a unique hash
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

//Keeps track of the chain
class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }
    //First block
    createGenesisBlock(){
        return new Block(0, "11/23/2020", "Gen Block", "0");
    }
    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    //Iterates through the chain comparing each block's hashes looking for discrepencies
    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

let voteChain = new BlockChain();
voteChain.addBlock(new Block(1, "11/23/2020", {amount:4}));
voteChain.addBlock(new Block(2, "11/23/2020", {amount:10}));
console.log(JSON.stringify(voteChain, null, 5));
console.log('Is Blockchain Valid? ' + voteChain.isChainValid());
voteChain.chain[1].data = {amount : 100}
console.log('Is Blockchain Valid? ' + voteChain.isChainValid());