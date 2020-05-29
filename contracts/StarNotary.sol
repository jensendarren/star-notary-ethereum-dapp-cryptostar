pragma solidity >=0.4.24;

//Importing openzeppelin-solidity ERC-721 implemented Standard
import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721Metadata.sol";

// StarNotary Contract declaration inheritance the ERC721 openzeppelin implementation
contract StarNotary is ERC721Metadata {
    // Constructor to pass through the token name and symbol to the ERC721Metadata constructor
    constructor(string memory _name, string memory _symbol)
    ERC721Metadata(_name, _symbol) public {}

    // Star data
    struct Star {
        string name;
    }

    // mapping the Star with the Owner Address
    mapping(uint256 => Star) public tokenIdToStarInfo;
    // mapping the TokenId and price
    mapping(uint256 => uint256) public starsForSale;

    // Events - StarClaimedEvent
    event StarClaimedEvent(string name, uint256 tokenId, uint date);

    // Create Star using the Struct
    function createStar(string memory _name, uint256 _tokenId) public { // Passing the name and tokenId as a parameters
        Star memory newStar = Star(_name); // Star is an struct so we are creating a new Star
        tokenIdToStarInfo[_tokenId] = newStar; // Creating in memory the Star -> tokenId mapping
        _mint(msg.sender, _tokenId); // _mint assign the the star with _tokenId to the sender address (ownership)
        emit StarClaimedEvent(_name, _tokenId, now);
    }

    // Putting an Star for sale (Adding the star tokenid into the mapping starsForSale, first verify that the sender is the owner)
    function putStarUpForSale(uint256 _tokenId, uint256 _price) public {
        require(ownerOf(_tokenId) == msg.sender, "You can't sale the Star you don't owned");
        starsForSale[_tokenId] = _price;
    }


    // Function that allows you to convert an address into a payable address
    function _make_payable(address x) internal pure returns (address payable) {
        return address(uint160(x));
    }

    function buyStar(uint256 _tokenId) public  payable {
        require(starsForSale[_tokenId] > 0, "The Star should be up for sale");
        uint256 starCost = starsForSale[_tokenId];
        address ownerAddress = ownerOf(_tokenId);
        require(msg.value > starCost, "You need to have enough Ether");
        _transferFrom(ownerAddress, msg.sender, _tokenId); // We can't use _addTokenTo or_removeTokenFrom functions, now we have to use _transferFrom
        address payable ownerAddressPayable = _make_payable(ownerAddress); // We need to make this conversion to be able to use transfer() function to transfer ethers
        ownerAddressPayable.transfer(starCost);
        if(msg.value > starCost) {
            msg.sender.transfer(msg.value - starCost);
        }
    }

    // lookUptokenIdToStarInfo provides a lookup of a star struct given a valid tokenId
    function lookUptokenIdToStarInfo (uint _tokenId) public view returns (string memory) {
        return tokenIdToStarInfo[_tokenId].name;
    }

    // exchangeStars function can be used to exchange stars between two differnet owners of stars
    function exchangeStars(uint256 _tokenId1, uint256 _tokenId2) public {
        // Passing to star tokenId you will need to check if the owner of _tokenId1 or _tokenId2 is the sender
        require((ownerOf(_tokenId1) == msg.sender || ownerOf(_tokenId2) == msg.sender), "You can't exchange a Star you don't own");
        // Get the owner of the two tokens (ownerOf(_tokenId1), ownerOf(_tokenId1)
        address ownerToken1 = ownerOf(_tokenId1);
        address ownerToken2 = ownerOf(_tokenId2);
        // Use _transferFrom function to exchange the tokens.
        _transferFrom(ownerToken1, ownerToken2, _tokenId1);
        _transferFrom(ownerToken2, ownerToken1, _tokenId2);
    }

    // transferStar changes the owner of a star of a given tokenId
    function transferStar(address _to, uint256 _tokenId) public {
        // Check if the sender is the ownerOf(_tokenId)
        address owner = msg.sender;
        require(ownerOf(_tokenId) == owner, "You can't transfer a Star you don't own");
        // Use the transferFrom(from, to, tokenId); function to transfer the Star
        _transferFrom(owner, _to, _tokenId);
    }

}