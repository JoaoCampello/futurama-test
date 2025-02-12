import React, { useState, useEffect, useCallback } from 'react';
import './styles.css';

const EpisodesPage = () => {
    const [selectedSeason, setSelectedSeason] = useState(1);
    const [data, setData] = useState({
        seasons: [],
        episodes: {},
        loading: true,
        loadingEpisodes: false
    });

    const fetchEpisodeDetails = useCallback(async (episodes, season) => {
        const promises = episodes.map(episode =>
            fetch(`https://futuramaapi.com/api/episodes/${episode.id}`)
                .then(res => res.json())
                .then(data => ({
                    ...episode,
                    airDate: data.airDate,
                    duration: data.duration,
                    broadcastCode: data.broadcastCode,
                    detailsLoaded: true
                }))
        );

        const detailedEpisodes = await Promise.all(promises);
        return detailedEpisodes;
    }, []);

    useEffect(() => {
        const fetchSeasons = async () => {
            try {
                const response = await fetch('https://futuramaapi.com/api/seasons');
                const jsonData = await response.json();
                
                const episodesObj = {};
                const seasonIds = jsonData.items.map(season => {
                    episodesObj[season.id] = season.episodes.map(episode => ({
                        id: episode.id,
                        number: episode.number,
                        name: episode.name,
                        detailsLoaded: false
                    }));
                    return season.id;
                });

                // Fetch details for the first season immediately
                const firstSeasonEpisodes = await fetchEpisodeDetails(episodesObj[1], 1);
                episodesObj[1] = firstSeasonEpisodes;
                
                setData({
                    seasons: seasonIds,
                    episodes: episodesObj,
                    loading: false,
                    loadingEpisodes: false
                });
            } catch (error) {
                console.error('Error fetching seasons:', error);
                setData(prev => ({ ...prev, loading: false }));
            }
        };

        fetchSeasons();
    }, [fetchEpisodeDetails]);

    useEffect(() => {
        if (!data.episodes[selectedSeason] || selectedSeason === 1) return;

        const fetchSeason = async () => {
            setData(prev => ({ ...prev, loadingEpisodes: true }));
            try {
                const detailedEpisodes = await fetchEpisodeDetails(
                    data.episodes[selectedSeason],
                    selectedSeason
                );

                setData(prev => ({
                    ...prev,
                    episodes: {
                        ...prev.episodes,
                        [selectedSeason]: detailedEpisodes
                    },
                    loadingEpisodes: false
                }));
            } catch (error) {
                console.error('Error fetching episode details:', error);
                setData(prev => ({ ...prev, loadingEpisodes: false }));
            }
        };

        fetchSeason();
    }, [selectedSeason, fetchEpisodeDetails]);

    if (data.loading) {
        return (
            <div className="episodes-page">
                <video className="video-background" autoPlay loop muted playsInline>
                    <source src="/assets/videos/background-vid.mp4" type="video/mp4" />
                </video>
                <div className="loading">Loading seasons...</div>
            </div>
        );
    }

    return (
        <div className="episodes-page">
            <video className="video-background" autoPlay loop muted playsInline>
                <source src="/assets/videos/background-vid.mp4" type="video/mp4" />
            </video>
        
            <div className="season-selector">
                {data.seasons.map((season) => (
                    <button
                        key={season}
                        className={`season-button ${selectedSeason === season ? 'active' : ''}`}
                        onClick={() => setSelectedSeason(season)}
                        disabled={data.loadingEpisodes}
                    >
                        Season {season}
                    </button>
                ))}
            </div>
            
            <div className="episodes-grid">
                {data.loadingEpisodes ? (
                    <div className="loading">Loading episode details...</div>
                ) : (
                    data.episodes[selectedSeason]?.map((episode) => (
                        <div key={episode.id} className="episode-card">
                            <img 
                                src={`/assets/images/episodes/s${selectedSeason}e${episode.number}.jpg`} 
                                alt={episode.name}
                                onError={(e) => {
                                    e.target.src = '/assets/images/futurama-placeholder.jpg';
                                }}
                            />
                            <div className="episode-info">
                                <h3>{episode.broadcastCode || `S${selectedSeason}E${episode.number}`}</h3>
                                <p>{episode.name}</p>
                                {episode.airDate && (
                                    <p className="air-date">
                                        Air Date: {new Date(episode.airDate).toLocaleDateString()}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default EpisodesPage;