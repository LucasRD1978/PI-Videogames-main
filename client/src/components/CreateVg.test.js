import React, {useState} from 'react';
import { configure, shallow, mount } from 'enzyme';
import { useDispatch, useSelector } from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import configureStore from "redux-mock-store";
import { Link, Navigate } from 'react-router-dom';
import CreateVg from './CreateVg';

configure ({adapter: new Adapter()});
const dispatch = useDispatch;

describe('structure', () => {
    var container;

    beforeEach(() => {
        container = shallow(<CreateVg/>);
    })
    
    it('Render a form', ()=>{
        expect(container.find('form')).toHaveLength(1)
    })
    
    it('Render a label with the text Name', () => {
        expect(container.find('label').at(0).text()).toEqual('Name')
    })

    it('Render a input whith property name equals name', () => {
        expect(container.find('input[name = "name]')).toHaveLength(1)
    })
})


