"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  colorIntensity?: number; // 1-10 scale
  speed?: number; // 1-10 scale
  blur?: number; // px value
  size?: "sm" | "md" | "lg" | "full";
}

export function AuroraBackground({
  className,
  children,
  colorIntensity = 5,
  speed = 5,
  blur = 100,
  size = "full",
}: AuroraBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Map size to class
  const sizeClasses = {
    sm: "w-[400px] h-[400px]",
    md: "w-[600px] h-[600px]",
    lg: "w-[800px] h-[800px]",
    full: "w-full h-full",
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match container
    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Aurora parameters
    const intensity = Math.min(Math.max(colorIntensity, 1), 10) / 10;
    const animationSpeed = Math.min(Math.max(speed, 1), 10) / 1000;

    // Colors for the aurora
    const colors = [
      `rgba(125, 200, 255, ${intensity})`, // Light blue
      `rgba(100, 220, 255, ${intensity})`, // Cyan
      `rgba(173, 216, 230, ${intensity})`, // Light sky blue
      `rgba(135, 206, 250, ${intensity})`, // Light steel blue
      `rgba(176, 224, 230, ${intensity})`, // Powder blue
      `rgba(127, 255, 212, ${intensity})`, // Aquamarine
      `rgba(64, 224, 208, ${intensity})`, // Turquoise
    ];

    // Create light points
    const lightPoints = Array.from({ length: 15 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      time += animationSpeed;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "rgba(10, 20, 40, 0.2)");
      gradient.addColorStop(1, "rgba(20, 30, 60, 0.2)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw aurora waves
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);

        for (let x = 0; x < canvas.width; x += 20) {
          const y = Math.sin(x * 0.01 + time + i) * 50 + canvas.height / 2 + i * 20;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, colors[i % colors.length]);
        gradient.addColorStop(1, colors[(i + 2) % colors.length]);

        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Draw and update light points
      lightPoints.forEach(point => {
        // Update position
        point.x += point.vx;
        point.y += point.vy;

        // Bounce off edges
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1;

        // Draw glow
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, point.radius * 10
        );
        gradient.addColorStop(0, point.color);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(point.x, point.y, point.radius * 10, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [colorIntensity, speed, blur]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden",
        sizeClasses[size],
        className
      )}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{
          filter: `blur(${blur}px)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}