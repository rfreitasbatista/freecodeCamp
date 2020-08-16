function checkCashRegister(price, cash, cid) {
  const notas = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,  
    "ONE": 1,  
    "FIVE": 5,  
    "TEN": 10,    
    "TWENTY": 20,    
    "ONE HUNDRED": 100
  }

  const valorDoCaixa = {
    "PENNY": cid[0][1], 
    "NICKEL": cid[1][1], 
    "DIME": cid[2][1], 
    "QUARTER": cid[3][1], 
    "ONE": cid[4][1], 
    "FIVE": cid[5][1], 
    "TEN": cid[6][1], 
    "TWENTY": cid[7][1], 
    "ONE HUNDRED": cid[8][1]
  }

  
  const quantidadeNotas = {
    "PENNY": 0,
    "NICKEL": 0,
    "DIME": 0,
    "QUARTER": 0,  
    "ONE": 0,  
    "FIVE": 0,  
    "TEN": 0,    
    "TWENTY": 0,    
    "ONE HUNDRED": 0
  }
  const trocoTotal = cash - price
  let answer = {
    status:'INSUFFICIENT_FUNDS',
    change: [],
  }
  let totalDoCaixa = 0 
  for(let total in valorDoCaixa) {
    totalDoCaixa += valorDoCaixa[total]
  }
  if(totalDoCaixa < trocoTotal) {
    return answer
  }

  if(cash === price) {
    return {status:'OPEN', change:'no-change'}
  }

  let remanejar = [];
  
  const trocoCalc = (troco) => {
    let valorDaMoeda = 0
    let nota = ''
    for(let valor in notas) {
      if(troco/notas[valor] >= 1) {
        if(notas[valor] > valorDaMoeda) {
          valorDaMoeda = notas[valor]
          nota = valor
        }
      }
    }
    
    quantidadeNotas[nota] += notas[nota]
    const restante = troco - valorDaMoeda
    if(restante >= 0.01){
      trocoCalc(restante.toFixed(2))
    }
  }
  
  trocoCalc(trocoTotal)
  
  const remanejamento = () => {
    remanejar.forEach((each, index) => {
      if (each[0] === 'ONE HUNDRED') {
        quantidadeNotas['TWENTY'] += each[1]
        quantidadeNotas['ONE HUNDRED'] -= each[1]
        remanejar.slice[index, 1]
      }
      if (each[0] === 'TWENTY') {
        quantidadeNotas['TEN'] += each[1]
        quantidadeNotas['TWENTY']-= each[1]
        remanejar.slice[index, 1]
      }
      if (each[0] === 'TEN') {
        quantidadeNotas['FIVE'] += each[1]
        quantidadeNotas['TEN'] -= each[1]
        remanejar.slice[index, 1]
      }
      if (each[0] === 'FIVE') {
        quantidadeNotas['ONE'] += each[1]
      quantidadeNotas['FIVE'] -= each[1]
      remanejar.slice[index, 1]
    }
    if (each[0] === 'ONE') {
      quantidadeNotas['QUARTER'] += each[1]
      quantidadeNotas['ONE'] -= each[1]
      remanejar.slice[index, 1]
    }
    if (each[0] === 'QUARTER') {
      quantidadeNotas['DIME'] += each[1]
      quantidadeNotas['QUARTER'] -= each[1]
      remanejar.slice[index, 1]
    }
    
    if (each[0] === 'DIME') {
      quantidadeNotas['NICKEL'] += each[1]
      quantidadeNotas['DIME'] -= each[1]
      remanejar.slice[index, 1]
    }
    
    if (each[0] === 'NICKEL') {
      quantidadeNotas['PENNY'] += each[1]
      quantidadeNotas['NICKEL'] -= each[1]
      remanejar.slice[index, 1]
    }
    
    remanejar.splice(index, 1);
  })
  temNoCaixa();
}

const temNoCaixa = () => {
  for(let note in valorDoCaixa) {
    if(valorDoCaixa[note] < quantidadeNotas[note]) {
      remanejar.push([note, (quantidadeNotas[note] - valorDoCaixa[note])])
    }
  }
  if(remanejar != '' && remanejar[0][0]!='PENNY'){
    remanejamento()
  }
}


temNoCaixa()

for(let total in valorDoCaixa) {
  if(valorDoCaixa[total != 0]) {
    answer.change.push([total, v])
  }
}

for(let total1 in quantidadeNotas) {
  if(quantidadeNotas[total1] != '0') {
    
    answer.change.unshift([total1, quantidadeNotas[total1]])
  }
}


if(totalDoCaixa === trocoTotal) {
  answer.status = "CLOSED"
  answer.change = []
  for(cada in quantidadeNotas){
    answer.change.push([cada, parseFloat(quantidadeNotas[cada])])
  }
}

if(quantidadeNotas['PENNY'] < valorDoCaixa['PENNY']) {
  answer.status = 'OPEN'
} 

if(answer.status === 'INSUFFICIENT_FUNDS') {
  answer.change = []
}

return answer
}

console.log(checkCashRegister(19.5, 178, [["PENNY", 10], ["NICKEL", 10], ["DIME", 10], ["QUARTER", 50], ["ONE", 50], ["FIVE", 50], ["TEN", 50], ["TWENTY", 60], ["ONE HUNDRED", 200]]))
