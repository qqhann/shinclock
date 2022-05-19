import React, { useState, useEffect } from "react";
import { useIntervalWhen, useToggle } from "rooks";
import { useParams } from "react-router-dom";
import {useClocks} from '../hooks/clock'



export const Room = () => {
    /*
     * Clock
     * running
     * start time
     * total seconds
     * 
     * useIntervalWhen
     * remaining = total seconds - (now - start)
     * format remaining to string
     * これで
     */
    const start = new Date();
    
    const [second, setSecond] = useState<number>(0);
    
    const [isOn, toggle] = useToggle()
    const {roomId} = useParams()
    const {clocks, create} = useClocks(roomId)
    
    useEffect(()=>{
        console.log(roomId)
    },[roomId])

    useIntervalWhen(
        () => {
            // countDown()
        },
        1000,
        isOn,
        true
    );


    return (
        <div className="h-screen w-screen bg-slate-50">
            <h1 className="text-3xl">ShinClock</h1>

            <div className="flex font-sans">
                <div className="flex-auto p-6">
                    <p>{roomId}</p>
                </div>
            </div>

            <div className="flex font-sans">
                <button onClick={create}>create clock</button>
                {clocks?.map(clock=><span>{clock.name}</span>)}
                
                <div className="p-3 bg-white rounded-lg shadow-md">
                    <div className="flex flex-wrap">
                        <h1 className="flex-auto text-lg font-semibold text-slate-900">
                            やっていく
                        </h1>
                        <p className="flex-auto text-lg font-semibold text-slate-900">
                            {("000" + second).slice(-2)}s
                        </p>
                    </div>
                    <div className="flex space-x-4 mb-6 text-sm font-medium">
                        <div className="flex-auto flex space-x-4">
                            <button className="h-10 px-6 font-semibold rounded-md bg-black text-white" onClick={toggle}>
                                Start 
                            </button>
                            <button className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900" type="button">
                                Edit 
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

