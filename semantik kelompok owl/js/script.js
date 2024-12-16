// Base URL untuk Jikan API
const apiUrl = "https://api.jikan.moe/v4/anime";

// Fungsi untuk mengambil data anime dari API
async function fetchAnime() {
    try {
        // Ambil nilai dari input pencarian dan kategori
        const search = document.getElementById("search").value.trim(); // Kata kunci pencarian
        const category = document.getElementById("category").value; // ID genre

        // Buat URL API dengan parameter
        let url = `${apiUrl}?q=${search}&order_by=popularity`;
        if (category) {
            url += `&genres=${category}`; // Tambahkan genre ID jika dipilih
        }

        // Panggil API dan parsing data
        const response = await fetch(url);
        const data = await response.json();

        // Tampilkan hasil ke halaman
        displayAnime(data.data);
    } catch (error) {
        console.error("Error fetching anime:", error);
        document.getElementById("anime-list").innerHTML = `
            <p style="color:red;">Gagal mengambil data anime. Silakan coba lagi nanti.</p>
        `;
    }
}

// Fungsi untuk menampilkan daftar anime
function displayAnime(animeList) {
    const animeContainer = document.getElementById("anime-list");
    animeContainer.innerHTML = ""; // Bersihkan daftar sebelumnya

    if (!animeList.length) {
        animeContainer.innerHTML = `
            <p style="color:gray;">Tidak ada anime yang ditemukan.</p>
        `;
        return;
    }

    animeList.forEach(anime => {
        const animeCard = `
            <div class="anime-card">
                <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
                <h3>${anime.title}</h3>
                <p>${anime.synopsis ? anime.synopsis.substring(0, 100) + "..." : "No synopsis available"}</p>
                <a href="${anime.url}" target="_blank">Detail</a>
            </div>
        `;
        animeContainer.innerHTML += animeCard;
    });
}

// Fungsi untuk cek tombol "Enter" pada input pencarian
function checkEnter(event) {
    if (event.key === "Enter") {
        fetchAnime();
    }
}

// Panggil fetchAnime() saat halaman dimuat
document.addEventListener("DOMContentLoaded", fetchAnime);