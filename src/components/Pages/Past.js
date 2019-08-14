import React, { Component } from 'react';
import '../../styles/components/common/_video.scss'
import YouTube from 'react-youtube';

const pecfestVideos = [
    {
        year: '2018',
        videoId: 'BWMzcA-nBQU'
    },
    {
        year: '2017',
        videoId: '70xeFk-Fazw'
    },
    {
        year: '2016',
        videoId: 'kMotFEvb0xc'
    }
];

class Past extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedVideo: 0,
        }
    }

    _onReady = (event) => {
        // access to player in all event handlers via event.target
        // event.target.mute();
    };

    _onEnd = (event) => {
        this.setState((state, props) => {
            return { selectedVideo: (state.selectedVideo + 1) % pecfestVideos.length };
        });

        event.target.playVideo();
    };

    _onStateChange = (event) => {
        console.log(event);
    };

    render() {
        const { selectedVideo } = this.state;

        const videoOptions = {
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
                controls: 0,
                rel: 0,
                showinfo: 0
            }
        };

        return (
            <div>
                <div className="video-background">
                    <div className="video-foreground">
                        <YouTube
                            videoId={pecfestVideos[selectedVideo].videoId}
                            opts={videoOptions}
                            className="video-iframe"
                            onReady={this._onReady}
                            onEnd={this._onEnd}
                            onStateChange={this._onStateChange}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Past;