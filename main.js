const SHA256 = require('crypto-js/sha256');

//Keeps track of each block
class Block{
    constructor(index, timestamp, data, previousHash= ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 4;
    }
    //Uses data during a block's creation to generate a unique hash
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }
    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: " + this.hash);
    }
}


//Keeps track of the chain
class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
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
        newBlock.mineBlock(this.difficulty);
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

//git add ./
//git commit
//git push

let voteChain = new BlockChain();

console.log('Mining block 1...');
voteChain.addBlock(new Block(1, "11/23/2020", {amount:4}));
console.log('Blockchain valid? ' + voteChain.isChainValid());

console.log('Mining block 2...');
voteChain.addBlock(new Block(2, "11/24/2020", {amount:10}));
console.log('Blockchain valid? ' + voteChain.isChainValid());