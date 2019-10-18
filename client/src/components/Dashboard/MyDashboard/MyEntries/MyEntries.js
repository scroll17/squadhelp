import React, {useEffect} from 'react';
import connect from "react-redux/es/connect/connect";


import { getUserEntries } from "../../../../actions/actionCreators/dashboardEntriesActionCreator";
import style from "./MyEntries.module.sass";
import Entry from "./MyEntry/MyEntry";


function MyEntries(props) {
    const { myEntries } = props;

    useEffect(() => {
        props.getUserEntries()
    }, []);

    const showMyEntries = entries => {
        return entries.map(entry => <Entry {...entry} key={entry.id}/>)
    };

    return (
        <div className={style.myEntries}>
            <div className={style.title}>my entries</div>
            <div className={style.listBox}>
                {showMyEntries(myEntries)}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    myEntries: state.dashboardEntriesReducer.myEntries
});
const mapDispatchToProps = dispatch => ({
    getUserEntries: () => dispatch(getUserEntries()),
});
export default connect(mapStateToProps, mapDispatchToProps)(MyEntries);

