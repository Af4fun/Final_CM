import Nerv from 'nervjs';
import Pica from '@/assets/imgs/a.jpg';
import Picb from '@/assets/imgs/b.jpg';
import Picc from '@/assets/imgs/c.jpg';
import Picd from '@/assets/imgs/d.jpg';
import Pice from '@/assets/imgs/e.jpg';
import Picf from '@/assets/imgs/f.jpg';
import Picg from '@/assets/imgs/g.jpg';
import Pich from '@/assets/imgs/h.jpg';

export default class ShowPic extends Nerv.Component {
  constructor (props) {
    super(props);
    this.state = {
      urls: [Pica, Picb, Picc, Picd, Pice, Picf, Picg, Pich],
      url: Pica,
      index: 0
    };
  }
  componentDidMount () {
    this.queryPic();
  }
  queryPic () {
    const { urls } = this.state;
    const { time } = this.props;
    let imgUrl = Pica;
    let index = 0;
    let rangs = [8, 17, 25, 31, 36, 43, 55, 72];
    for (let i = 0; i < rangs.length; i++) {
      if (time <= rangs[i]) {
        imgUrl = urls[i];
        index = i;
        break;
      }
    }
    this.setState({
      url: imgUrl,
      index
    });
  }
  handleClose () {
    const { url } = this.state;
    if (!~window.saveList.indexOf(url)) {
      window.saveList.unshift(url);
    }
    this.props.onClose({
      url,
    });
  }
  handleShare () {
    this.props.onShare();
  }
  render () {
    const { url } = this.state;
    return (
      <div className='show_pic'>
        <div className="content">
          <img src={url} alt="" />
          <div className="btns">
            <div className="share" onClick={this.handleShare.bind(this)}></div>
            <div className="back" onClick={this.handleClose.bind(this)}></div>
          </div>
        </div>
      </div>
    );
  }
}
