"use client";

import React, { useState } from "react";
import { AuroraBackground } from "./aurora-background";
import { Slider } from "@/components/ui/slider";

export function AuroraDemo() {
  const [colorIntensity, setColorIntensity] = useState(5);
  const [speed, setSpeed] = useState(5);
  const [blur, setBlur] = useState(100);
  const [size, setSize] = useState<"sm" | "md" | "lg" | "full">("full");

  return (
    <div className="w-full space-y-8 p-4">
      <h2 className="text-2xl font-bold text-center">Aurora Background Demo</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Color Intensity: {colorIntensity}</label>
            <Slider
              min={1}
              max={10}
              step={1}
              value={[colorIntensity]}
              onValueChange={(value) => setColorIntensity(value[0])}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Animation Speed: {speed}</label>
            <Slider
              min={1}
              max={10}
              step={1}
              value={[speed]}
              onValueChange={(value) => setSpeed(value[0])}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Blur Effect: {blur}px</label>
            <Slider
              min={0}
              max={200}
              step={10}
              value={[blur]}
              onValueChange={(value) => setBlur(value[0])}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Size</label>
            <div className="flex space-x-4">
              {(["sm", "md", "lg", "full"] as const).map((sizeOption) => (
                <button
                  key={sizeOption}
                  onClick={() => setSize(sizeOption)}
                  className={`px-3 py-1 rounded ${
                    size === sizeOption
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {sizeOption}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="h-[400px] flex items-center justify-center">
          <AuroraBackground
            colorIntensity={colorIntensity}
            speed={speed}
            blur={blur}
            size={size}
            className="rounded-lg"
          >
            <div className="h-full w-full flex items-center justify-center">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg text-white text-center max-w-xs">
                <h3 className="text-xl font-bold mb-2">Aurora Background</h3>
                <p>
                  A beautiful animated background with customizable aurora lights effect.
                  Perfect for creating immersive UI experiences.
                </p>
              </div>
            </div>
          </AuroraBackground>
        </div>
      </div>
    </div>
  );
}