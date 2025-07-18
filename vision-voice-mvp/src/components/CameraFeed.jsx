// CameraFeed.jsx
import React, { useEffect, useRef } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

const CameraFeed = ({ onDetect }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const modelRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
    };

    const loadModel = async () => {
      modelRef.current = await cocoSsd.load();
    };

    const detectFrame = async () => {
      if (
        videoRef.current &&
        canvasRef.current &&
        modelRef.current &&
        videoRef.current.readyState === 4
      ) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Match canvas to video size
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const predictions = await modelRef.current.detect(video);

        predictions.forEach((pred) => {
          const [x, y, width, height] = pred.bbox;
          ctx.beginPath();
          ctx.strokeStyle = 'lime';
          ctx.lineWidth = 2;
          ctx.rect(x, y, width, height);
          ctx.stroke();

          ctx.fillStyle = 'lime';
          ctx.font = '16px sans-serif';
          ctx.fillText(pred.class, x + 5, y > 10 ? y - 5 : y + 15);
        });

        if (onDetect) {
          const detectedItems = predictions.map((p) => p.class);
          onDetect(detectedItems);
        }
      }

      animationRef.current = requestAnimationFrame(detectFrame);
    };

    const init = async () => {
      await startCamera();
      await loadModel();
      detectFrame();
    };

    init();

    return () => {
      cancelAnimationFrame(animationRef.current);
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, [onDetect]);

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '640px' }}>
      <video
        ref={videoRef}
        style={{
          visibility: 'hidden', // <- better than display: none to preserve frame timing
          position: 'absolute',
          width: '100%',
          height: 'auto',
          zIndex: -1,
        }}
        playsInline
        muted
      />
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          borderRadius: '12px',
          objectFit: 'cover',
        }}
      />
    </div>
  );
};

export default CameraFeed;
