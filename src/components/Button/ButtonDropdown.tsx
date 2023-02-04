import React from 'react';
    import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import { properties } from '@dicebear/avatars/dist/utils/schema';
import Loader from 'components/Loader';



export const ButtonDropdown = (props: any) => { 
  const items: MenuProps['items'] =  [
  { 
    key: '1',
    label: ( 
      props.loading? <> <Loader/> <br/><a onClick={props.cancel} >
      Cancel
    </a></> :
      <a onClick={props.clickFunction} >
        {props.menuTitle}
      </a>
    ),
  }
];
     return(
      <Dropdown   menu={{ items }} trigger={['click']} placement="bottomLeft" > 
        <Button color='#1E82DD' style={{color: "#563DEA", background: "none", border: "none"}}>{props.loading && props.title? props.title :  "ACTIONS"}</Button>
      </Dropdown>
     )
      
   
   
    }

export default ButtonDropdown;