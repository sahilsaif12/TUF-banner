import React, { useEffect, useState } from 'react'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';

function Banner({ show, tagline, description, endTime, created_at, link }) {
    const [hour, setHour] = useState(9)
    const [hideBanner, sethideBanner] = useState(false)
    const [targetDate, settargetDate] = useState(new Date(endTime))
    const calculateTimeLeft = () => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        let timeLeft = {};
        let percentages = {};

        if (difference > 0) {
            const daysLeft = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hoursLeft = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutesLeft = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const secondsLeft = Math.floor((difference % (1000 * 60)) / 1000);

            timeLeft = { days: daysLeft, hours: hoursLeft, minutes: minutesLeft, seconds: secondsLeft };



            const totalDays = new Date(endTime).getDate() - new Date(created_at).getDate();
            const totalHours = 24;
            const totalMinutes = 60;
            const totalSeconds = 60;
            percentages = {
                days: (daysLeft / totalDays) * 100,
                hours: (hoursLeft / totalHours) * 100,
                minutes: (minutesLeft / totalMinutes) * 100,
                seconds: (secondsLeft / totalSeconds) * 100,
            };
            console.log(daysLeft + " " + totalDays + " " + percentages.days);
        } else {
            sethideBanner(true);
            timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
            percentages = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return { timeLeft, percentages };
    };

    const [timeData, setTimeData] = useState(calculateTimeLeft());


    useEffect(() => {
        const timer = setInterval(() => {
            setTimeData(calculateTimeLeft());
        }, 1000);

        // Clear the interval when the component is unmounted
        return () => clearInterval(timer);
    }, []);

    const { timeLeft, percentages } = timeData;


    return (
        <>
        {hideBanner && <div className="text-center text-gray-300 absolute top-1/2 w-full ">No banner available currently</div> }
        <div class={`${(!show || hideBanner ) && "hidden"} flex items-center justify-center h-screen `}>
        
            <div class="relative bg-violet-700/70 text-white p-10 rounded-lg w-4/5 flex justify-between ">
                <div class="w-2/5">
                    {/* <div class="bg-teal-500 text-xs font-semibold inline-block px-2 py-1 rounded">Special Offer</div> */}
                    <h1 class="text-6xl font-bold mt-4">
                        <span>Fashion</span>
                        <span class="text-yellow-400 block italic">Sale</span>
                    </h1>
                    <p class="text-2xl font-semibold mt-2">{tagline}</p>
                    <p class="text-sm  text-gray-300 mt-4">
                        {description}
                    </p>
                    <a href={link} target="_blank" class="inline-block mt-6 px-6 py-3 border border-yellow-400 text-yellow-400 rounded hover:bg-yellow-400 hover:text-blue-900 transition">Shop Now</a>
                </div>

                <div class="w-2/4 bg-gray-7000">
                    <p class="text-xl text-left m-3 text-gray-200  font-semibold mt-2">Offer ends in</p>
                    <div className="flex justify-evenly h-4/5 items-center">

                        <CircularProgressbarWithChildren
                            value={percentages.days}
                            className='w-32 h-32   '
                            counterClockwise={true}
                            styles={buildStyles({
                                pathColor: "#1eb9ff",
                                trailColor: "rgb(17 24 39 / 0.9)"
                            })}
                        >
                            <div className="rounded-full  flex items-center justify-center bg-gray-900/90 shadow-2xl">
                                <div className="w-28 h-28 bg-red-40 rounded-full border-8 border-gray-600/80 circle  flex justify-center items-center text-gray-300 font-semibold" style={{ color: '#1eb9ff' }}>
                                    {timeLeft?.days >= 0 && timeLeft?.days < 10 ? "0" + timeLeft.days : timeLeft.days} <br /> Days
                                </div>
                            </div>
                        </CircularProgressbarWithChildren>
                        <CircularProgressbarWithChildren
                            value={percentages.hours}
                            className='w-32 h-32   '
                            counterClockwise={true}
                            styles={buildStyles({
                                pathColor: "#ff2972",
                                trailColor: "rgb(17 24 39 / 0.9)"
                            })}
                        >
                            <div className="rounded-full  flex items-center justify-center bg-gray-900/90 shadow-2xl">
                                <div className="w-28 h-28 bg-red-40 rounded-full border-8 border-gray-600/80 circle  flex justify-center items-center text-gray-300 font-semibold" style={{ color: '#ff2972' }}>
                                    {timeLeft?.hours >= 0 && timeLeft?.hours < 10 ? "0" + timeLeft.hours : timeLeft.hours} <br /> Hours
                                </div>
                            </div>
                        </CircularProgressbarWithChildren>
                        <CircularProgressbarWithChildren
                            value={percentages.minutes}
                            className='w-32 h-32   '
                            counterClockwise={true}
                            styles={buildStyles({
                                pathColor: "#fee800",
                                trailColor: "rgb(17 24 39 / 0.9)"
                            })}
                        >
                            <div className="rounded-full  flex items-center justify-center bg-gray-900/90 shadow-2xl">
                                <div className="w-28 h-28 bg-red-40 rounded-full border-8 border-gray-600/80 circle  flex justify-center items-center text-gray-300 font-semibold" style={{ color: '#fee800' }}>
                                    {timeLeft?.minutes >= 0 && timeLeft?.minutes < 10 ? "0" + timeLeft.minutes : timeLeft.minutes} <br /> Minutes
                                </div>
                            </div>
                        </CircularProgressbarWithChildren>
                        <CircularProgressbarWithChildren
                            value={percentages.seconds}
                            className='w-32 h-32   '
                            counterClockwise={true}
                            styles={buildStyles({
                                pathColor: "#04fc43",
                                trailColor: "rgb(17 24 39 / 0.9)"
                            })}
                        >
                            <div className="rounded-full  flex items-center justify-center bg-gray-900/90 shadow-2xl">
                                <div className="w-28 h-28 bg-red-40 rounded-full border-8 border-gray-600/80 circle  flex justify-center items-center text-gray-300 font-semibold" style={{ color: '#04fc43' }} >
                                    {timeLeft?.seconds >= 0 && timeLeft?.seconds < 10 ? "0" + timeLeft.seconds : timeLeft.seconds} <br /> Seconds
                                </div>
                            </div>
                        </CircularProgressbarWithChildren>

                    </div>

                </div>

                <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-teal-500 px-4 py-2 font-bold text-sm rounded-full shadow-lg">Special Offer</div>

            </div>

        </div>
        </>
    )
}

export default Banner