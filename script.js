 const hourHand = document.getElementById("hour");
        const minuteHand = document.getElementById("minute");
        const secondHand = document.getElementById("second");
        const clockEl = document.getElementById("clock");
        const tickAudio = document.getElementById("tick");
        const soundBtn = document.getElementById("soundBtn");

        let soundEnabled = false;

      
        for (let i = 0; i < 60; i++) {
            const mark = document.createElement("div");
            mark.className = "tick-mark";
            if (i % 5 === 0) mark.classList.add("hour-mark");
            
            mark.style.transform = `translateX(-50%) rotate(${i * 6}deg)`;
            clockEl.appendChild(mark);
        }

       
        const clockRadius = 180; 
        const numberOffset = 42; 

        for (let i = 1; i <= 12; i++) {
            const numEl = document.createElement("div");
            numEl.className = "number";
            numEl.textContent = i;

            const angle = (i * 30 - 90) * (Math.PI / 180); 
            const x = clockRadius + (clockRadius - numberOffset) * Math.cos(angle) - 20; 
            const y = clockRadius + (clockRadius - numberOffset) * Math.sin(angle) - 20; 

            numEl.style.left = `${x}px`;
            numEl.style.top = `${y}px`;
            clockEl.appendChild(numEl);
        }

        
        soundBtn.addEventListener("click", () => {
            soundEnabled = !soundEnabled;
            soundBtn.textContent = soundEnabled ? "Turn Sound OFF" : "Turn Sound ON";
            soundBtn.style.background = soundEnabled ? "red" : "green";
        });

       
        function updateClock() {
            const now = new Date();
            const hr = now.getHours();
            const min = now.getMinutes();
            const sec = now.getSeconds();

            hourHand.style.transform = `translateX(-50%) rotate(${hr * 30 + min * 0.5}deg)`;
            minuteHand.style.transform = `translateX(-50%) rotate(${min * 6}deg)`;
            secondHand.style.transform = `translateX(-50%) rotate(${sec * 6}deg)`;

            if (soundEnabled) {
                tickAudio.currentTime = 0;
                tickAudio.play().catch(() => {}); 
            }
        }

        updateClock();
        setInterval(updateClock, 1000);
