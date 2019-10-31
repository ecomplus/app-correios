// https://suporte.boxloja.pro/article/90-faixa-de-ceps-do-brasil

window.zipCodeToString = function (zipCode) {
  var zipCodeString = typeof zipCode === 'number'
    ? zipCode.toString()
    : zipCode
  if (zipCodeString.length < 8) {
    return '0' + zipCodeString
  } else {
    return zipCodeString
  }
}

window.getZipCodeRanges = function () {
  var $tds = document.querySelectorAll('td:last-child')
  var zipCodeRanges = []
  for (var i = 0; i < $tds.length; i++) {
    var zipCodeRangeStrings = $tds[i].innerText.replace(/-/g, '').split(/( a |\n)/)
    for (var j = 0; j < zipCodeRangeStrings.length; j = j + 4) {
      var zipStart = parseInt(zipCodeRangeStrings[j], 10)
      if (zipStart < 100000) {
        zipStart *= 100
      }
      zipStart++
      var findZipStart = function (zipCode) {
        return parseInt(zipCode[0], 10) === zipStart
      }
      var zipEnd = parseInt(zipCodeRangeStrings[j + 2], 10)
      var findZipEnd = function (zipCode) {
        return parseInt(zipCode[1], 10) === zipEnd
      }
      var savedZipRange = zipCodeRanges.find(findZipStart)
      if (savedZipRange) {
        if (zipCodeRanges.find(findZipEnd)) {
          continue
        } else {
          zipStart = parseInt(savedZipRange[1], 10) + 2
        }
      }
      zipCodeRanges.push([
        window.zipCodeToString(zipStart),
        window.zipCodeToString(zipEnd)
      ])
    }
  }
  console.log(zipCodeRanges.length)
  console.log()
  console.log(JSON.stringify(zipCodeRanges, null, 2))
}

window.getZipCodeRanges()
