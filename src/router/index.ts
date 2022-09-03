import React from 'react';
import LoginPage from '../views/pages/LoginPage/LoginPage';
import ChatPage from '../views/pages/ChatPage/ChatPage';
import ClientsPage from '../views/pages/ClientsPage/ClientsPage';

export type IRoute = {
  path: string
  component: React.ComponentType
  excect?: boolean
}

export enum RouteNames {
  LOGIN = '/login',
  CHAT = '/chat/:id?',
  CLIENTS = '/clients',
}

export const publicRoutes: IRoute[] = [
  {path: RouteNames.LOGIN, component: LoginPage},
];

export const privateRoutes: IRoute[] = [
  {path: RouteNames.CHAT, component: ChatPage},
  {path: RouteNames.CLIENTS, component: ClientsPage},
];
