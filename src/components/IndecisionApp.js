import React from 'react';
import AddOption from './AddOption.js';
import Options from './Options.js';
import Header from './Header.js';
import Action from './Action.js';
import OptionModal from './OptionModal.js';

class IndecisionApp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            options: props.options,
            selectedOption: undefined
        };

    }

    componentDidMount() {
        try{
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);

            if(options){
                this.setState({
                    options: options
                })

            } 
        } catch(e){
            //Do nohting
        }
    }

    componentDidUpdate(prevProps, prevState){
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }

    handleDeleteOptions= () => {
        this.setState({
            options: []
        });
    }

    handleDeleteOption= (optionToRemove) => {
        let newOptions = this.state.options.filter((option) => {
            return optionToRemove !== option; 
        });
        this.setState({
            options: newOptions
        });
    }

    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        console.log(randomNum);
        const option = this.state.options[randomNum];
        this.setState({
            selectedOption: option
        });
    }

    handleAddOption= (option) => {
        if(!option){
            return 'Enter valid value';
        }else if (this.state.options.indexOf(option) > -1){
            return 'Already exists';
        }
        let newArray = this.state.options.concat(option);
        this.setState({
            options: newArray
        })
    }

    handleRemoveSelectedOption = () => {
        let option = undefined;
        this.setState({
            selectedOption: option
        });
    }

    render(){
        const title = 'Indecision';
        const subtitle = 'Put your hands in the life of a computer';

        return(
            <div >
                <Header title={title} subtitle={subtitle}/>
                <div className="body">
                    <Action 
                        handlePick = {this.handlePick} 
                        hasOptions={this.state.options.length > 0}/>
                    <div className="widget">
                        <Options options={this.state.options}
                            handleDeleteOptions = {this.handleDeleteOptions} 
                            handleDeleteOption = {this.handleDeleteOption}
                        />
                        <AddOption 
                            handleAddOption = {this.handleAddOption} 
                            options={this.state.options}/>
                    </div>
                    <OptionModal
                        selectedOption={this.state.selectedOption}
                        handleRemoveSelectedOption={this.handleRemoveSelectedOption}/>
                </div>
            </div>
        );
    }
}

IndecisionApp.defaultProps = {
    options: []
}

export default IndecisionApp;
