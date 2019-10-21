import Nerv from 'nervjs';
import ShowPic from '@/components/showPic';
import EndPage from '@/components/endPage';
import Ablum from '@/components/ablum';
class MyApp extends Nerv.Component {
  constructor () {
    super();
    this.state = {
      ready: false, // 是否准备
      isPlaying: false, // 正在播放
      isPuase: true, // 是否暂停
      time: 0,
      isTakePic: false,
      over: false,
      openAblum: false,
      saveList: []
    };
  }
  componentDidMount () {
    let video = this.refs.video;
    if ('addEventListener' in video && 'canplaythrough' in video) {
      video.addEventListener('canplaythrough', () => {
        this.handleLoaded();
      });
    } else {
      setTimeout(() => {
        this.handleLoaded();
      }, 1000);
    }
    /// 当视频结束后
    video.onended = () => {
      this.setState({
        ready: false,
        isPlaying: false,
        time: 0,
        over: true
      });
    };
  }
  handleLoaded () {
    let loadingNode = document.getElementById('loading');
    let bar = document.getElementById('bar');
    bar.style.width = '100%';
    setTimeout(() => {
      loadingNode.style.display = 'none';
      this.setState({
        ready: true,
      });
    }, 2000);
  }

  handlePlay () {
    this.setState({
      ready: false
    }, () => {
      Nerv.$bgm.play();
      this.refs.video.play();
      this.refs.video.addEventListener('playing', isPlayingFnc, false);
    });
    const isPlayingFnc = () => {
      setTimeout(() => {
        this.refs.video.pause();
        this.setState({
          isPlaying: true,
          isPuase: false
        });
        this.refs.video.removeEventListener('playing', isPlayingFnc, false);
      }, 1400);
    };
  }

  handleDown () {
    Nerv.$bgm.pause();
    this.refs.video.play();
    this.setState({
      isPuase: false
    });
  }
  /// 手指抬起
  handleUp () {
    this.refs.video.pause();
    Nerv.$bgm.play();
    this.setState({
      isPuase: true
    });
  }
  /// 打开拍照
  handleTakePhoto () {
    let time = this.refs.video.currentTime;
    this.setState({
      time: time,
      isTakePic: true
    });
  }
  /// 关闭拍照
  handlePicClose () {
    this.setState({
      isTakePic: false
    });
  }

  handleTryAgain () {
    this.setState({
      ready: true, // 是否准备
      isPlaying: false, // 正在播放
      isPuase: true, // 是否暂停
      time: 0,
      isTakePic: false,
      over: false
    });
  }

  handleOpenAblum () {
    console.log('打开相册');
    this.setState({
      openAblum: true
    });
  }

  handleCloseAblum () {
    this.setState({
      openAblum: false
    });
  }
  handleShare () {
    document.getElementById('share_arrow').style.display = 'block';
  }

  render () {
    const { ready, isPlaying, isPuase, isTakePic, time, over, openAblum } = this.state;
    return (
      <div className='video_wrap'>
        {
          ready && <div className="start">
            <div className="container">
              <div className="text"></div>
              <div className="trigger" onclick={this.handlePlay.bind(this)}></div>
            </div>
          </div>
        }
        {
          isPlaying && <div className='playing'>
            {isPuase && <div className="take_pic" onClick={this.handleTakePhoto.bind(this)}></div>}
            <div className="ablum_btn" onClick={this.handleOpenAblum.bind(this)}></div>
            <div className="ablum_tip"></div>
            <div className="btn"
              onTouchStart={this.handleDown.bind(this)}
              onTouchEnd={this.handleUp.bind(this)}
              onMouseDown={this.handleDown.bind(this)}
              onMouseUp={this.handleUp.bind(this)}
            ></div>
          </div>
        }
        {
          over && <EndPage onClick={this.handleTryAgain.bind(this)} onShare={this.handleShare.bind(this)}></EndPage>
        }
        {
          isTakePic && <ShowPic time={time} onClose={this.handlePicClose.bind(this)} onShare={this.handleShare.bind(this)}></ShowPic>
        }
        {
          openAblum && <Ablum onClick={this.handleCloseAblum.bind(this)}></Ablum>
        }
        <video className='video'
          x5-playsinline="true"
          playsinline="true"
          webkit-playsinline="true"
          x5-video-player-type="h5"
          x5-video-player-fullscreen="true"
          ref='video'
          width='750'
          hight='1334'
          muted={true}
          src={window.videoUrl}
        >
          您的浏览器不支持 video 标签。
        </video>
      </div>
    );
  }
}

export default MyApp;
