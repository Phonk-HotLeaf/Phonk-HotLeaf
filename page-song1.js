        // 🌙 تغییر حالت دارک تم و روشن با کلیک روی دکمه
        document.addEventListener("DOMContentLoaded", function() {
            const toggleButton = document.getElementById("dark-light");
            const icon = toggleButton.querySelector("svg");

            // بررسی وضعیت فعلی تم از localStorage
            if(localStorage.getItem("theme") === "light") {
                document.body.classList.add("light-theme");
                icon.innerHTML = ` <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" /> `;
            }

            toggleButton.addEventListener("click", () => {
                document.body.classList.toggle("light-theme");
                const isLight = document.body.classList.contains("light-theme");

                // ذخیره حالت تم در localStorage
                localStorage.setItem("theme", isLight ? "light" : "dark");

                // تغییر آیکون تم
               icon.innerHTML = isLight ? `
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />                 ` : `
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                `;
            });
        });



        let allSongs = [];

        // بارگذاری اطلاعات آهنگ‌ها از فایل JSON
        fetch('songs.json')
          .then(response => response.json())
          .then(data => {
            allSongs = data;
          })
          .catch(error => {
            console.error("خطا در بارگذاری فایل JSON:", error);
          });
      
        const searchInput = document.getElementById("searchInput");
        const resultContainer = document.getElementById("searchResults");
      
        searchInput.addEventListener("input", () => {
          const query = searchInput.value.trim().toLowerCase();
          resultContainer.innerHTML = "";
      
          if (query === "") return;
      
          const filteredSongs = allSongs.filter(song =>
            song.title.toLowerCase().includes(query)
          );
      
          if (filteredSongs.length > 0) {
            filteredSongs.forEach(song => {
              const songItem = document.createElement("div");
              songItem.textContent = "🎵 " + song.title;
              songItem.classList.add("song-result");
              resultContainer.appendChild(songItem);
            });
          } else {
            const notFoundImg = document.createElement("img");
            notFoundImg.src = "img"; // مسیر عکس
            notFoundImg.alt = "نتیجه‌ای پیدا نشد";
            notFoundImg.classList.add("not-found-image");
            resultContainer.appendChild(notFoundImg);
          }
        });



        
        