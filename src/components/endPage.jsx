import Nerv from 'nervjs';

export default class EndedPage extends Nerv.Component {
  handleClick () {
    this.props.onClick();
  }
  handleShare () {
    this.props.onShare();
  }
  handleJumpMobile () {
    window.location.href = 'https://5.u.mgd5.com/c/lthn/zaje/index.html?t=1570781590725&token=K5Kvl6eNgWOO4Uf53ceF6CNZJ_dG0RMZL6767jplTDc&avatar=http%3A%2F%2Fthirdwx.qlogo.cn%2Fmmopen%2Fvi_32%2FDYAIOgq83epCtyvA27oEibptxwyfaczeOQK0ib2Oy4NYKtvmibCQrjoK2ibnU4koqw258nExGM91zmy3Q3FKkm08Nw%2F132&nickname=Z%E3%80%82&openid=oLd0ut-iLDw7sAiE4qitDsnRxYAg&appid=wx75babd529e23776c';
  }
  handleJumpMusic () {
    window.location.href = 'https://music.163.com/song?id=1356246658&userid=411801489';
  }
  render () {
    return (
      <div className="ending">
        <div className="text"></div>
        <div className="top">
          <div className="btn_inline again" onClick={this.handleClick.bind(this)}></div>
          <div className="btn_inline share" onClick={this.handleShare.bind(this)}></div>
        </div>
        <div className="btn_jump" onClick={this.handleJumpMobile}></div>
        <div className="btn_music" onClick={this.handleJumpMusic}></div>
      </div>
    );
  }
}
