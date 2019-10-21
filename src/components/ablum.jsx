import Nerv from 'nervjs';

export default class Ablum extends Nerv.Component {
  handleClick () {
    this.props.onClick();
  }
  render () {
    let list = window.saveList;
    return (
      <div className='show_ablum'>
        <div className="content">
          <div className="ablum_list">
            {
              list.map((url, index) => (
                <div className="item" key={index + 1}>
                  {
                    url && <img src={url} />
                  }
                </div>
              ))
            }
          </div>
          <div className="tip">
            左滑查看更多
          </div>
          <div className="btn" onClick={this.handleClick.bind(this)}></div>
        </div>
      </div>
    );
  }
}
