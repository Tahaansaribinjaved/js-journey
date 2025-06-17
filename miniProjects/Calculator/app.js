let display = document.getElementById('display');

console.log(display.innerText);


const clickBtn = (e)=>{
    
    let op_arr = ['+','-','*','/'];
    for (let i = 0; i < op_arr.length; i++) {
                const ele = op_arr[i];
                if(e.target.innerHTML == ele){ // 
                    let answer_btn = document.getElementById('answer-btn');
                    answer_btn.disabled = true;
                    answer_btn.style.backgroundColor = 'rgba(95, 111, 128, 0.546)';
                    answer_btn.style.cursor = 'not-allowed';
                    console.log(answer_btn.style.backgroundColor);
                    // display.innerText = display.innerText.slice(0,display.innerText.length -1)
                    // display.innerText  = display.innerText + e.target.innerHTML
                    break;
                    // return;
                    
                }else{
                    let answer_btn = document.getElementById('answer-btn');
                    answer_btn.disabled = false;
                    console.log(answer_btn.style);
                    answer_btn.style.backgroundColor = 'rgba(95, 111, 128, 0.829)';
                    answer_btn.style.cursor = 'pointer';
                    
                    // display.innerText = display.innerText.slice(0,display.innerText.length -1)
                    // display.innerText  = display.innerText + e.target.innerHTML
                    // break;
                }
                
            }
    for (let index = 0; index < op_arr.length; index++) {
        const element = op_arr[index];
        if(display.innerText.at(-1)==element){  
            for (let i = 0; i < op_arr.length; i++) {
                const ele = op_arr[i];
                if(e.target.innerHTML == ele){ // 
                    // let answer_btn = document.getElementById('answer-btn');
                    // answer_btn.disabled = true;
                    // console.log(answer_btn.style);
                    display.innerText = display.innerText.slice(0,display.innerText.length -1)
                    display.innerText  = display.innerText + e.target.innerHTML
                    return;
                }
                
            }
            

        }
    }
    // op_arr.forEach(i =>{
    //     console.log(display.innerText.at(-1));
        
        
    // })
    if(e.target.innerHTML === 'C'){
        display.innerText = ''
        return;
    }else if(e.target.innerHTML === '='){
        display.innerText = eval(display.innerText)  
        console.log(eval(display.innerText) );
        return;
    }else if(e.target.innerHTML === 'back'){
        console.log(display.innerText.at(-1));    
        display.innerText = display.innerText.slice(0,display.innerText.length -1)
        return;
    }

    display.innerText  = display.innerText + e.target.innerHTML
    console.log(e.target.innerHTML);
    
}
// btn.addEventListener('click',clickBtn);
// 
