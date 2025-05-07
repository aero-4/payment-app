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
        <div>
            <div className='flex flex-row gap-1 method flex-wrap items-center justify-center'>
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
                    <h1>TRC20</h1>
                </div>
                <div name='tron'
                     onClick={updateInvoiceData}>
                    <img src={tronPng} alt="" className='photo__mini__icons'/>
                    <h1>Tron</h1>
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <button className='btn text-center'
                        onClick={handleContinueInvoice}>Продолжить
                </button>
            </div>
        </div>
    );
}

function InvoiceLevelEnd({data}) {
    const time_sleep = 3000
    const count_req = 100
    data = {summa: 100, date: '01.01.2020 19:17:01', id: '128daeqw8-839189as-8cz98c-32188', url: 'https://example.com'}
    document.href = `/invoice/${data.id}`

    useEffect(() => {
        const isMount = false;

        if (!isMount) {
            for (const i = 0; i < count_req; i++) {
                setTimeout(async () => {
                    const data = await fetchCheckInvoice(data)
                    if (data.result) {
                        console.log('Платеж прошел')
                        return
                    }
                }, time_sleep)
            }
        }

        isMount = true;
    })

    return (
        <>
            <div className='flex flex-col gap-1 cursor-pointer'>
                <h1 className='text'>Id: {data.id}</h1>
                <h1 className='text'>Сумма: {data.amount}</h1>
                <h1 className='text'>Дата: {data.date}</h1>
                <a href={data.url}>
                    <button className='btn'>Оплатить</button>
                </a>
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
                <div className='flex flex-col gap-7 bg-gray-900 w-full p-6 rounded max-w-120'>
                    {level === 0 &&
                        <InvoiceLevelStart setInvoiceData={setInvoiceData} invoiceData={invoiceData} handleContinueInvoice={handleContinueInvoice}/>}
                    {level === 1 && <InvoiceLevelEnd/>}

                </div>
            </div>
        </>
    );
}

export default Invoice;




