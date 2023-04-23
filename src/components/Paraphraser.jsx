import React, { useRef, useState } from 'react'
import translate from '../services/translate';
import rewrite from '../services/rewrite';
import { data } from 'autoprefixer';

function Paraphraser() {

  const [charlength, setCharlength] = useState(0);
  const date = new Date().toLocaleDateString('en-US');  
  const inputRef = useRef(null);
  const outputRef = useRef(null);

  const updateLength = (e) => {
    setCharlength(e.target.value.length);
  }

  const paraphrasedResult = async () => {
    const text = inputRef.current.value;

    const response = await translate("ka", "en", text);
    const paraphrased = await rewrite(response.data.translations[0].translatedText);
    const finalResult = await translate("en", "ka", paraphrased.choices[0].message.content);
    
    outputRef.current.value = finalResult.data.translations[0].translatedText;
  }

  const updateDailyUsage = () => {
    const usage = JSON.parse(localStorage.getItem("usage"));
    if(usage) {
      if(Object.keys(usage)[0] == date) {
        if(usage[date] < 10) {
          usage[date]++;
          localStorage.setItem("usage", JSON.stringify(usage))
        } else {
        }
      } else {
        const usageObject = {
          [date]: 0
        }
        localStorage.setItem("usage", JSON.stringify(usageObject))
      }
    } else {
      const usageObject = {
        [date]: 0
      }
      localStorage.setItem(`usage`, JSON.stringify(usageObject));
    }

  }

  const paraphrase = () => {
    const usage = JSON.parse(localStorage.getItem("usage"));
    if(usage) {
      if(usage[date] < 10) {
        paraphrasedResult();
      } else {
        alert("თქვენ დღიური ლიმიტი ამოგეწურათ. ამჟამინდელი ყოველდღიური ლიმიტია - 10.")
      }
      updateDailyUsage();
    } else {
      paraphrasedResult();
      updateDailyUsage();
    }
    
  }


  

  return (
    <main className='w-10/12 m-auto px-3 my-[4rem]'>
      <div className='paraphraser flex flex-col lg:flex-row'>
        <div className='relative textarea flex-1 mb-6 lg:mr-6'>
          <label htmlFor="text" className="block mb-2 font-medium text-gray-900 dark:text-white text-lg">თქვენი ტექსტი <span className='max float-right'>{charlength} / 2000</span></label>
          <textarea ref={inputRef} maxLength={2000} id="text" rows="10" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:outline-blue-400" placeholder="შეიყვანეთ თქვენი ტექსტი აქ..." onChange={updateLength}>
          </textarea>
          <button className="bg-[#60A5FA] hover:bg-blue-500 text-white font-bold py-2 px-4 rounded absolute bottom-5 right-5" onClick={paraphrase}>
              გადაწერე
          </button>
        </div>
        <div className='textarea flex-1'>
          <label htmlFor="text-output" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">პერიფრაზირებული ტექსტი</label>
          <textarea ref={outputRef} id="text-putput" rows="10" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:outline-blue-400" placeholder="აქ გამოისახება თქვენი ტექსტი..." readOnly></textarea>
        </div>
      </div>

    </main>
  )
}

export default Paraphraser