import React from 'react';


class GenerateTable extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:this.props.data
        }
       
    }
  
    static getDerivedStateFromProps(props,state) { 
        if(JSON.stringify(props.data) !== JSON.stringify(state.data)){
            return {data:props.data}
        }
        return null
    }

  
    render(){
        try {
            let {data} = this.state;
            let {options:{column,action,actionName},title} = this.props;
            return(
                
                <>
                    <h4>{title}</h4>
                    {
                        data && data.length >0 ?   (<table>
                            <thead>
                                <tr>
                                {
                                    Object.keys(data[0]).map((element,index) =>{
                                        return(
                                            <th key ={index}>{element.toLocaleUpperCase()}</th>
                                        )  
                                    }) 
                                }
                                {column && <th> {column.toLocaleUpperCase()}</th>}
                                </tr>
        
                            </thead>
                            <tbody>
                                {
                                    data.map((element,index) =>{
                                        return(
                                            <tr key={index}>
                                            {
                                            Object.entries(element).map(([key,value],index) =>{
                                                return(
                                                    <td key ={index}>{value}</td>
                                                )  
                                            })
                                             
                                            }
                                            {actionName && <td> 
                                                <button className="btn btn-primary" onClick={()=>{action(element)}}>{actionName}
                                                </button>    
                                            </td>}
                                            </tr>
                                        )
                                    })
                                }
        
                            </tbody>
                        </table>):(<p>No details found</p>)
                    }
                </>
                
                
              
              )    
        } catch (error) {
            console.log(error)
            return(<h1>something went wrong</h1>)
        }
        
    }
}

export default GenerateTable;