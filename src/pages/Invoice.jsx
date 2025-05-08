import {useEffect, useState} from 'react'

import svgSbp from '../assets/sbp.svg'
import cardPng from '../assets/credit-card.png'
import usdtSvg from '../assets/usdt-trc20.svg'
import tronPng from '../assets/tron.png'
import API_URL from "../../config"


async function fetchCreateInvoice() {
    try {
        const response = await fetch(API_URL + '/invoice/create/',
            {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            }
        );
        if (!response.ok) throw new Error(`Статус: ${response.status}`);
        const data = await response.json();
        console.log(data);
    } catch (err) {
        console.error('Ошибка:', err);
    }
}

async function fetchCheckInvoice(data) {
    try {
        const response = await fetch(API_URL + `/invoice/update/${data.id}`,
            {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            }
        );
        if (!response.ok) throw new Error(`Статус: ${response.status}`);
        const data = await response.json();
        console.log(data);
    } catch (err) {
        console.error('Ошибка:', err);
    }
}


function InvoiceLevelStart({setInvoiceData, invoiceData, handleContinueInvoice}) {
    function updateInvoiceData(e) {
        setInvoiceData(prev => ({...prev, [invoiceData.method]: e.target.name}))
    }


    return (
        <div className='flex flex-col gap-4 justify-center items-center'>
            <div className='flex flex-row gap-2 method flex-wrap justify-center items-center cursor-pointer'>
                <div name='sbp'
                     onClick={updateInvoiceData}>
                    <img src={svgSbp} alt="sbp" className='photo__mini__icons'/>
                    <h1>СБП</h1>
                </div>
                <div name='cards'
                     onClick={updateInvoiceData}>
                    <img src={cardPng} alt="cards" className='photo__mini__icons'/>
                    <h1>Cards</h1>
                </div>
                <div name='trc20'
                     onClick={updateInvoiceData}>
                    <img src={usdtSvg} alt="" className='photo__mini__icons'/>
                    <h1>USDT TRC20</h1>
                </div>
                <div name='tron'
                     onClick={updateInvoiceData}>
                    <img src={tronPng} alt="" className='photo__mini__icons'/>
                    <h1>TRON TRC20</h1>
                </div>
            </div>

            <button className='btn text-center max-w-50'
                    onClick={handleContinueInvoice}>
                Продолжить
            </button>

        </div>
    );
}

function InvoiceLevelEnd({data}) {
    const time_sleep = 3000
    const count_req = 100
    data = {summa: 100, date: '01.01.2020 19:17:01', id: '128daeqw8-839189as-8cz98c-32188', url: 'https://example.com'}
    document.href = `/invoice/${data.id}`

    // useEffect(() => {
    //     const isMount = false;
    //
    //     if (!isMount) {
    //         for (const i = 0; i < count_req; i++) {
    //             setTimeout(async () => {
    //                 const data = await fetchCheckInvoice(data)
    //                 if (data.result) {
    //                     console.log('Платеж прошел')
    //                     return
    //                 }
    //             }, time_sleep)
    //         }
    //     }
    //
    //     isMount = true;
    // })

    return (
        <>
            <div className='flex flex-col gap-1'>
                <h1 className='text'>Id: {data.id}</h1>
                <h1 className='text'>Сумма: {data.amount}</h1>
                <h1 className='text'>Дата: {data.date}</h1>
                <button className='btn'
                        onClick={() => document.location.href = 'https://t.me/'}>
                    Оплатить
                </button>
            </div>
        </>
    );
}

function Invoice({props}) {
    const [invoiceData, setInvoiceData] = useState({amount: 100.10, method: ''})
    const [level, setLevel] = useState(0)


    function handleContinueInvoice() {
        const data = fetchCreateInvoice()
        if (!data) {
            console.log("ОШИБКА", data)
        }
        setInvoiceData(data)
        setLevel(1)
    }

    return (
        <>
            <div className='page'>
                <div className='flex flex-col bg-gray-900 w-auto p-12 rounded'>
                    {level === 0 &&
                        <InvoiceLevelStart setInvoiceData={setInvoiceData} invoiceData={invoiceData} handleContinueInvoice={handleContinueInvoice}/>}
                    {level === 1 && <InvoiceLevelEnd/>}

                </div>
            </div>
        </>
    );
}

export default Invoice;




