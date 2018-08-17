import * as React from 'react';

interface ISelectorProps{
    list: String[];
    onSelected: any;
    selected: string;
    clicks: number[];
}

export class Selector extends React.Component<ISelectorProps>{

    constructor(props: any){
        super(props);
    }

    render(){
        return <div>
            <ul>
                {this.props.list.map((elem: string, index: number) =>
                    <li key={elem}
                        onClick={() => this.props.onSelected(elem)}
                        style={{ color: this.props.selected === elem ? 'red' : 'black' }}
                        >
                        {elem} - {this.props.clicks[index]}
                    </li>
                )}
            </ul>
        </div>;
    }
}