import * as React from 'react';

import './Root.scss';
import { Header } from '../../components/Header/Header';
import { Selector } from '../../components/Selector/Selector';

interface IRootState{
    tasks: string[];
    selected: any;
    total: number;
    user: string;
    clicks: number[];
}

export class Root extends React.Component<{},IRootState> {

    constructor (props: any){
        super (props);
        const tasks= [
            'Hola',
            'Amigo',
            'como',
            'estas'
        ];

        const clicksArrayWithLength = new Array(tasks.length).fill(0);


        this.state = {
            tasks : tasks,
            selected: null,
            total: 0,
            user: 'Jaime',
            clicks: clicksArrayWithLength
        };


    }


    onChanged(elem: string) {
        let index = this.state.tasks.indexOf(elem);
        let clicksReference = this.state.clicks;
        clicksReference[index]++;
        this.setState({selected: elem, clicks: clicksReference });
        console.log(this.state.clicks);
    }

    get total(): number{
        console.log('calculando');
        return this.state.clicks.reduce((total: number, current: number) => {
            return total + current;
        }, 0);
    }

    setUser(user: string){
        this.setState({user: user});
    }

    render(){
        return <div>  
            <Header title={`Total: ${this.total}`}
                text={this.state.user}
                img="./assets/img/logo.png"/>

            <Selector list={this.state.tasks} selected={this.state.selected} clicks={this.state.clicks} onSelected={(elem: string) => {
                this.onChanged(elem);
            }}/>

            <button onClick={() => this.setUser(this.state.user + 1)}>Cambiar!</button>


        </div>
    }
}























