import React from 'react';
import { StyledHeader, HomeLink, NavList, NavLink, EditButton } from './Styles';
import { EditContext } from '../../App';

/**
* Header
* @type Component
* @description header component to wrap main route and navigation links
* @returns Header component
*/
const Header = () => (
    <EditContext.Consumer>
        {({editMode, changeEditMode}) => (
            <StyledHeader>
                <section>
                    <HomeLink to='/'>
                        Book Store
                    </HomeLink>
                </section>

                <section>
                    <NavList>
                        <li>
                            <NavLink to='/book/new'>
                                New Book
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to='/author/new'>
                                New Author
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to='/category/new'>
                                New Category
                            </NavLink>
                        </li>

                        <li>
                            <EditButton edit={editMode} onClick={(e)=> {e.preventDefault(); changeEditMode();}} href='/' >
                                {editMode ? 'Exit Edit Mode': 'Edit Mode'}
                            </EditButton>
                        </li>
                    </NavList>
                </section>
            </StyledHeader>
            )
        }
        
    </EditContext.Consumer>
);


export default Header;