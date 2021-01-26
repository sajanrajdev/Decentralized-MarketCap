  // Function to capitalize a string
  const capitalize = (s: string) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  // Function to format integers into a certain currency
  const currencyFormatter = (number: number, currency: string) =>
    new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2
  }).format(number);

  // Function to format numbers into 2 decimal point fixed percentages
  const percentageFormatter = (number: number) => {
    if(number != null){
      var percentage = number.toFixed(2) + "%";
      return percentage;
   } 
   else{
     return "N/A";
   }
  }
  // Function to truncate a string to a certain length
  const truncateString = (str: string | null, num: number) => {
    if(str == null){
        return null
    }
    if (str.length <= num) {
        return str
    }
    return str.slice(0, num) + '...'
  }

  // Function to sort calculate the prices and totalLiquidity in USD and sort the token list in terms of this last one
  const sortTokenList = (tokenslist: any[], ethPrice: number) => {
    var sortedItems = tokenslist.map(
      token => ({...token, totalLiquidity: token.totalLiquidity.valueOf()*token.derivedETH.valueOf()*ethPrice, price: token.derivedETH.valueOf()*ethPrice})
    ); // create a new array of items with totalLiquidity and Price added
    sortedItems = sortedItems.sort((a,b) => a['totalLiquidity'] < b['totalLiquidity'] ? 1 : -1); //Sorts desc based on TotalLiquidity
    sortedItems = sortedItems.map(
      token => ({...token, totalLiquidity: currencyFormatter(token.totalLiquidity, 'usd'), price: currencyFormatter(token.price, 'usd')})
    ); // Format total liquidity and price to USD
    return sortedItems;
  }

  // Function to return Token data based on a given symbol
  const getTokenBySymbol = (tokenslist: any[], selectedSymbol: string) => {
    var selectedToken = tokenslist.find(x => x.symbol === selectedSymbol)
        console.log(selectedToken);
      return (selectedToken);
    }

  // Function to return Token data based on a given ID
  const getTokensByID = (tokenslist: any[], selectedKeys: any[] | any) => {
    var selectedTokens: any[] = []
    let i: number = 0
    if(selectedKeys){
      selectedKeys.forEach((element: any[] | any) => {
        selectedTokens[i] = tokenslist.find(x => x.id === element)
        i++;
      });
      return (selectedTokens);
    }
  }

/*   const HandleCheckBox = () => {
    if(selectedKeys){
      var tokens: any[] | any = getTokensByID(tokenslist, selectedKeys);
      if(selectedKeys.length == 1){
        console.log(tokens[0].symbol)
        setSelectToken1(tokens[0].symbol)
      }
      else if(selectedKeys.length == 2){
        console.log(tokens[1].symbol)
        setSelectToken2(tokens[1].symbol)
      }
      else if(selectedKeys.length >= 2){
        console.log("Toom many selected")
      }
    }
    return(null) 
  } */

  export {percentageFormatter, currencyFormatter, capitalize, truncateString, sortTokenList, getTokenBySymbol, getTokensByID}