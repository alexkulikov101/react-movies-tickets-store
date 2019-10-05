import React, { useContext, useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import HomeHeader from '../home/HomeHeader';
import SideBar from '../../layout/sideBar/SideBar';
import Spinner from '../../layout/spinner/Spinner';
import TicketItem from './TicketItem';
import TicketFilter from './TicketFilter';
import TicketContext from '../../../context/ticket/ticketContext';
import AuthContext from '../../../context/auth/authContext';

import './Ticket.scss';

const Ticket = () => {
    const ticketContext = useContext(TicketContext);
    const { tickets, getTickets, loading, filtered } = ticketContext;
    const { loadUser } = useContext(AuthContext);

    const [classValue, setClassValue] = useState({
        value: '',
    });
    const classAdd = (item: string) => {
        setClassValue({
            value: item,
        });
    };

    useEffect(() => {
        loadUser();
        getTickets();
    }, []);

    return (
        <main className={`ticket home__wrap ${classValue.value}`}>
            <SideBar classAdd={classAdd} />
            <div className="ticket__wrap">
                <div className=" ticket__section-wrap home__sections-wrap">
                    <HomeHeader title={'My Tickets'} />
                    <div className="ticket__section container">
                        <div className="ticket__block-center">
                            <TicketFilter />
                            <ul className="ticket__list">
                                {tickets !== null && tickets.length === 0 && !loading ? (
                                    <h4 className="ticket__warning">You don`t have tickets!</h4>
                                ) : null}

                                <>
                                    {tickets !== null && !loading ? (
                                        <TransitionGroup component={null}>
                                            {filtered !== null
                                                ? filtered.map((item: any) => (
                                                      <CSSTransition key={item._id} timeout={500} classNames="item">
                                                          <TicketItem ticket={item} key={item._id} />
                                                      </CSSTransition>
                                                  ))
                                                : tickets.map((item: any) => (
                                                      <CSSTransition key={item._id} timeout={500} classNames="item">
                                                          <TicketItem ticket={item} key={item._id} />
                                                      </CSSTransition>
                                                  ))}
                                        </TransitionGroup>
                                    ) : (
                                        <Spinner />
                                    )}
                                </>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Ticket;
