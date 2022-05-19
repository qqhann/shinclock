import React, { useState } from "react";
import { useIntervalWhen, useToggle } from "rooks";
import { useParams } from "react-router-dom";

export const Room = () => {
    const start = new Date();
    const [diff, setDiff] = useState<number>(0);
    const [isOn, toggle] = useToggle();

    useIntervalWhen(
        () => {
            setDiff((old) => old + 1);
        },
        1000,
        isOn,
        true
    );

    const { id } = useParams()

    return (
        <div className="h-full w-full bg-slate-50">
            <h1 className="text-3xl">ShinClock</h1>

            <div className="flex font-sans">
                <div className="flex-auto p-6">
                    <p>{id}</p>
                </div>
            </div>

            <div className="flex font-sans">
                <div className="flex-auto p-3">
                    <div className="flex flex-wrap">
                        <h1 className="flex-auto text-lg font-semibold text-slate-900">
                            やっていく
                        </h1>
                        <p className="flex-auto text-lg font-semibold text-slate-900">
                            {("00" + diff).slice(1)}
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

