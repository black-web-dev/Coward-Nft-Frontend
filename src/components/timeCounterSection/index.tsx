import { useEffect, useState } from 'react'
import { TimerContainer } from './timerContainer'
import { browserName, isIOS, isIPhone13 } from 'react-device-detect';
import { Header } from './header'
import Config from '@/config/app';

type Props = {
  timeLineId: number;
  message?: string;
}

const TimeCounter = ({ timeLineId = 0, message: _message = '' }: Props) => {
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [message, setMessage] = useState<string>(_message);

  useEffect(() => {

    let currentRoundEndTime = Config.roundEndTime[timeLineId];
    currentRoundEndTime = (browserName == 'Mobile safari' || isIOS || isIPhone13) ? currentRoundEndTime.replace(/\-/g, '/') : currentRoundEndTime;

    let countDownDate = new Date(currentRoundEndTime).getTime();

    var updateTime = setInterval(() => {

      var CET = new Date().toLocaleString('en-US', { timeZone: 'Europe/Madrid' })
      var now = new Date(CET).getTime();

      var difference = countDownDate - now;

      var newDays = Math.floor(difference / (1000 * 60 * 60 * 24));
      var newHours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var newMinutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      var newSeconds = Math.floor((difference % (1000 * 60)) / 1000);

      setDays(newDays);
      setHours(newHours);
      setMinutes(newMinutes);
      setSeconds(newSeconds);

      if (difference <= 0) {
        clearInterval(updateTime);
        setMessage("");
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
      }
    })

    return () => {
      clearInterval(updateTime);
    }

  }, [timeLineId]);

  return (
    <div className="flex flex-col items-center">
      <Header message={message} />
      <TimerContainer
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    </div>
  )
}

export default TimeCounter