import React from 'react';

const CardVideo = () => {
    return (
        <div className="card card-article card-shadow my-4 ">
            <div className="card-header">
                <div className="img-cover" >
                    <video width="400" autoplay="true" loop  playsInline="true">
                            Your browser does not support HTML video.
                        <source  src="https://ak.picdn.net/shutterstock/videos/1026411863/preview/stock-footage-abstract-liquid-painting-texture-this-x-hd-footage-is-an-amazing-organic-background-for.webm" type="video/mp4"/>

                    </video>
                </div>
                <div className="card-avatar">
                    <div className="avatar area-avatar">
                        <div className="avatar-img"></div>
                        <div className="avatar-bkg"></div>
                        <div className="avatar-gradient"></div>
                    </div>
                </div>
                <div className="card-category label-sx rounded fs--2">
                    supply-chain
                </div>
            </div>
            <div className="card-body">
                <div className="card-info">
                    <div className="card-area">comunicazioni</div>
                </div>
                <div className="info-body">
                    <div className="fs--1">01 sett 2020</div>
                    <h5>Title</h5>
                </div>

            </div>
            <div className="card-footer flex-between-center row">
                <div className="col-3">
                    <div className="like">
                        <div className="ico-like"></div>
                        <div className="badge like-number">2</div>
                    </div>
                </div>
                <div className="col-3">
                    <div className="comments">
                        <div className="ico-comment"></div>
                        <div className="badge comment-number">2</div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="favorite text-right">
                        <div className="ico-favorite">s</div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default CardVideo;