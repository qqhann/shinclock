import React, { useState } from "react";
import { useIntervalWhen, useToggle } from "rooks";

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

    return (
        <div className="h-full">
            <h1 className="text-3xl">ShinClock</h1>
            <button onClick={toggle}>Toggle</button>
            <span>{diff}</span>

            <div className="flex font-sans">
                <div className="flex-auto p-6">
                    <p>あ</p>
                </div>
            </div>

            <div className="flex font-sans">
                <form className="flex-auto p-3">
                    <div className="flex flex-wrap">
                        <h1 className="flex-auto text-lg font-semibold text-slate-900">
                            わかりました
                        </h1>
                        <div className="text-lg font-semibold text-slate-500">
                            $110.00
                        </div>
                        <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
                            In stock
                        </div>
                    </div>
                    <div className="flex space-x-4 mb-6 text-sm font-medium">
                        <div className="flex-auto flex space-x-4">
                            <button className="h-10 px-6 font-semibold rounded-md bg-black text-white" type="submit">
                                Buy now
                            </button>
                            <button className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900" type="button">
                                Add to bag
                            </button>
                        </div>
                        <button className="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200" type="button" aria-label="Like">
                            <svg width="20" height="20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                            </svg>
                        </button>
                    </div>
                    <p className="text-sm text-slate-700">
                        Free shipping on all continental US orders.
                    </p>
                </form>
            </div>
        </div>
    );
}

