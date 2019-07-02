import React, { useLayoutEffect, useRef } from "react";
import { timer } from "d3-timer";

export type cb = (...args: any[]) => void;

export default function useTimer(callback: cb, play: boolean): void {
  const savedTick = useRef<0 | cb>(0);
  savedTick.current = callback;
  useLayoutEffect(() => {
    if (play) {
      let last = 0,
        t = timer(elapsed => {
          // let elapsed = Date.now();
          let dt = (elapsed - last) / 1000;
          last = elapsed;
          if (savedTick.current) savedTick.current(dt);
        });
      return () => t.stop();
    }
  }, [play]);
}
