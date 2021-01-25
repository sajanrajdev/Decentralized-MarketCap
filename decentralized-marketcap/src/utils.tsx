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

  export {percentageFormatter, currencyFormatter, capitalize, truncateString}