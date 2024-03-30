import { useEffect, useState } from "react";

const WiseCalculator=()=>{
    // const url = "https://api.currencyapi.com/v3/currencies"
    const url = "https://api.currencyapi.com/v3/convert"

    //currencies
    const [to_be_converted_amount,set_to_be_converted_amount] = useState(0);
    const [usd_amount,set_usd_amount] = useState(0.00);

    //fees
    const [bank_transfer_fee,set_bank_transfer_fee] = useState(0);
    const [our_fee,set_our_fee] = useState(332.01);
    const [total_fees,set_total_fees] = useState(0);
    const [total_convertible_amount,set_total_convertible_amount] = useState(0);

  
    //
    //headers
    const head = new Headers();
    head.append("content-type","application/json")
    head.append("apikey","cur_live_FpPUllxA038WwHvHj5xDCH7WsHLuwynciarMNe4u")

    //request Body
    const requestBody = {
        method : 'GET',
        headers: head,
    }

    //function to fetch data
    const getData =async (newUrl)=>{
        try{
            const d = await fetch(newUrl,requestBody)
            const data = await d.json();
            console.log("Data returned from server after post request: ",data);
        }
        catch(err){
            console.log("failed fetch call",err)
        }
    }
    // getData();

    
    return(
        
        <div>
            <h1 className="text-3xl font-bold underline">
                Wise Calculator
            </h1>
            
            <textarea onChange={(e)=>{
                // const c = e.target.value;
                // const newUrl = url + `?value=${c}`;
                const before_conversion = e.target.value;

                const after_bank_transfer_fee = before_conversion - bank_transfer_fee;

                const after_our_fee = after_bank_transfer_fee - our_fee;

                const tFees = bank_transfer_fee + our_fee;

                set_total_fees(tFees);
                // getData(newUrl);
                set_total_convertible_amount(after_our_fee);
                const after_conversion = (before_conversion-total_fees)/83.3451;
                set_usd_amount(after_conversion)
            }}></textarea>
            <h2>
                {bank_transfer_fee} INR <span>Bank transfer fee</span>
            </h2>
            <h2>
                {our_fee} INR <span>Our fee</span>
            </h2>
            <h2>
                {total_fees} INR <span>Total fees</span>
            </h2>
            <hr></hr>
            <h2>
                {total_convertible_amount} INR <span>Total amount we'll convert</span>
            </h2>
            <h2>
            ÷ 83.3451 INR <span>Guaranteed rate(87h)</span>
            </h2>
            <textarea onFocus={(e)=>{
                e.target.value = usd_amount;
            }}>
              0
            </textarea>
        </div>
    )
}

export default WiseCalculator;