const express = require("express"); // app
const app = express();

app.use(express.json()); // POST Parse
app.use(express.static("public")); // static files

let songs = [
  // HYPE
  { id: 1, title: "Nanchaku", artist: "Seedhe Maut, MC Stan", mood: "hype" },
  { id: 2, title: "Namastute", artist: "Seedhe Maut", mood: "hype" },
  { id: 3, title: "Khatta Flow", artist: "Seedhe Maut, KR$NA", mood: "hype" },
  { id: 4, title: "Daytona", artist: "Karan Aujla", mood: "hype" },
  { id: 5, title: "Seedhe Maut's interlude", artist: "Seedhe Maut", mood: "hype" },
  { id: 6, title: "Elephant", artist: "Tame Impala", mood: "hype" },
  { id: 7, title: "Not Like Us", artist: "Kendrick Lamar", mood: "hype" },
  { id: 8, title: "FE!N", artist: "Travis Scott, Playboi Carti", mood: "hype" },
  { id: 9, title: "goosebumps", artist: "Travis Scott", mood: "hype" },
  { id: 10, title: "Run It Up", artist: "Hanumankind", mood: "hype" },
  { id: 11, title: "Agency", artist: "Talha Anjum, Rap Demon", mood: "hype" },
  { id: 12, title: "Shutdown", artist: "Seedhe Maut", mood: "hype" },
  { id: 13, title: "MF Gabhru!", artist: "Karan Aujla", mood: "hype" },
  { id: 14, title: "Type Shit", artist: "Future, Metro Boomin, Travis Scott", mood: "hype" },
  { id: 15, title: "Tokyo Drift", artist: "Teriyaki Boyz", mood: "hype" },

  // SAD
  { id: 16, title: "Kohra", artist: "Seedhe Maut", mood: "sad" },
  { id: 17, title: "Maina", artist: "Seedhe Maut", mood: "sad" },
  { id: 18, title: "Ektarfa", artist: "King", mood: "sad" },
  { id: 19, title: "La Haasil", artist: "Sunny Khan Durrani", mood: "sad" },
  { id: 20, title: "Gumaan", artist: "Young Stunners", mood: "sad" },
  { id: 21, title: "Departure Lane", artist: "Talha Anjum", mood: "sad" },
  { id: 22, title: "Tum Saath Rehnaa", artist: "King", mood: "sad" },
  { id: 23, title: "Waqt Ki Baatein", artist: "Dream Note", mood: "sad" },
  { id: 24, title: "Akela", artist: "DIVINE", mood: "sad" },
  { id: 25, title: "Nadaan", artist: "Seedhe Maut", mood: "sad" },
  { id: 26, title: "Kyun", artist: "Talha Anjum", mood: "sad" },
  { id: 27, title: "Afsanay", artist: "Talha Anjum", mood: "sad" },
  { id: 28, title: "Hausla", artist: "Seedhe Maut", mood: "sad" },
  { id: 29, title: "Shaayar", artist: "Bharat Chauhan, Seedhe Maut", mood: "sad" },
  { id: 30, title: "Tu Nasha", artist: "Dhruv Sthetick", mood: "sad" },

  // CHILL
  { id: 31, title: "Gulabo", artist: "Arpit Bala", mood: "chill" },
  { id: 32, title: "Yezdi", artist: "Nanku", mood: "chill" },
  { id: 33, title: "Boyfriend", artist: "Karan Aujla", mood: "chill" },
  { id: 34, title: "Baaraat", artist: "Ritviz, Nucleya", mood: "chill" },
  { id: 35, title: "Roz", artist: "Ritviz, Nucleya", mood: "chill" },
  { id: 36, title: "Your Eyes", artist: "Talwiinder", mood: "chill" },
  { id: 37, title: "Aaoge Tum Kabhi", artist: "The Local Train", mood: "chill" },
  { id: 38, title: "Choo Lo", artist: "The Local Train", mood: "chill" },
  { id: 39, title: "Softly", artist: "Karan Aujla", mood: "chill" },
  { id: 40, title: "Excuses", artist: "AP Dhillon, Gurinder Gill", mood: "chill" },
  { id: 41, title: "Baaraat", artist: "Ritviz", mood: "chill" },
  { id: 42, title: "Mishri", artist: "Anuv Jain", mood: "chill" },
  { id: 43, title: "Antariksh", artist: "Anuv Jain", mood: "chill" },
  { id: 44, title: "Heeriye", artist: "Karun, Nanku", mood: "chill" },
  { id: 45, title: "Dooba", artist: "Nanku", mood: "chill" }
];

let lastSongId = null;

app.get("/recommend", async (req,res) => {
    const mood = req.query.mood;
    const filteredSongs = songs.filter(song => song.mood === mood);

    if(filteredSongs.length === 0){
        return res.json({ message: "no song for this mood"});
    }
    let selectedSong;

    do{
    let randomIndex = Math.floor(Math.random() * filteredSongs.length);
     selectedSong = filteredSongs[randomIndex];
    }while(lastSongId === selectedSong.id && filteredSongs.length > 1);

    lastSongId = selectedSong.id;

    try {
        const cleanArtist = selectedSong.artist.split(",")[0];
        // selectedSong.artist.replace(/,/g,"");
        const query = `${selectedSong.title} ${cleanArtist}`;

        const response = await fetch(
            `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=1`
        );

        const data = await response.json();
        const apiSong = data.results[0];
        
        return res.json({
        title: selectedSong.title,
        artist: selectedSong.artist,
        mood: selectedSong.mood,
        cover: apiSong ? apiSong.artworkUrl100.replace("100x100", "500x500"): null,
        preview: apiSong ? apiSong.previewUrl : null
        });

    } catch (e) {
    return res.json({
      title: selectedSong.title,
      artist: selectedSong.artist,
      mood: selectedSong.mood,
      cover: null,
      preview: null
    });
    }
})

app.listen(8000, ()=>{
    console.log("Server running on port 8000")
})