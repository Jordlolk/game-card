const sentences = document.querySelectorAll('.sentences'),
buttonVerify = document.getElementById('verify'),
cards = document.querySelectorAll('.off'),
checkboxes = document.querySelectorAll('[data-inputs="inputs" ]')
let spanText = null

buttonVerify.classList.add("disabled")

const showResult = (truePoints , count) => {
  buttonVerify.addEventListener('click' , () => {
      let res = window.confirm(`Você acertou ${truePoints.length} e errou ${count}`)
      res ? window.location.reload() : null
      })
}
const abilityButton = (marked , count) => {
  let truePoints = marked.filter((card) => card === "correct")
  if(marked.length === 3){
    buttonVerify.disabled = false;
    buttonVerify.addEventListener("mouseenter" , () => {buttonVerify.classList.add("onverify")})
    buttonVerify.classList.remove("disabled")
    showResult(truePoints , count)
  } 
}
const  scannerResult = (cards) => {
  let marked = [];
  
  let count = 0;
  const correctAnswers = ["Orgão P" , "Geppeto" , "Livro arbítrio"]
  const hasChecked = (cards) => {
    return cards.children[0].hasAttribute("checked")
  }
  cards.forEach((cards) => {
    let answer = cards.children[1].innerText 
    if(hasChecked(cards)){
      if(correctAnswers.includes(answer) && !marked.includes(answer)){
        marked.push("correct")
      } else if (!correctAnswers.includes(answer) && !marked.includes(false)){
        marked.push("wrong")
         count += 1;
      }
      abilityButton(marked , count)
    }
  })
}
const removeAllSelected = (card) => {
  card.forEach((card)=>{
      card.classList.remove("on")
      card.children[0].removeAttribute("checked");
  })
    
}

const cardSelected = (card) => {
  card.children[0].setAttribute("checked" ,"");
  card.classList.add("on");
}
const createEventeClick = (card) => {
  card.addEventListener('click' , (e) => {
      const clickedCard = e.currentTarget;
     const cardParent = clickedCard.parentElement
     const currentListCards = cardParent.querySelectorAll('.off')
     removeAllSelected(currentListCards)
     cardSelected(clickedCard)
     scannerResult(cards)
  })
}
cards.forEach((card) => createEventeClick(card))