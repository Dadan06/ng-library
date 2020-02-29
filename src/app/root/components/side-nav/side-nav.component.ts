import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { Menu } from '../../types/menu.interface';

@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {
    @Input() menus: Menu[] = [];
    @Input()
    set defaultActiveMenuIndex(index: number) {
        this.activeMenuIndex = index;
    }
    @Input()
    set defaultActiveSubMenuIndex(index: number) {
        this.activeSubMenuIndex = index;
    }

    @Input() set url(url: string) {
        this.activateMenuForCurrentUrl(url);
    }

    activeMenuIndex?: number;
    activeSubMenuIndex?: number;
    today: number = Date.now();
    todaySubsrciption: Subscription;

    constructor(private router: Router) {}

    ngOnInit() {
        this.activateMenuForCurrentUrl(this.url);
        this.activateMenuForCurrentUrl(this.url);
        this.todaySubsrciption = timer(0, 1000).subscribe(_ => (this.today = Date.now()));
    }

    ngOnDestroy(): void {
        this.todaySubsrciption.unsubscribe();
    }

    activateMenu(index: number) {
        this.activeMenuIndex = index;
        this.activeSubMenuIndex = 0;

        setTimeout(() => this.activeMenuIndex && this.activateMenuForCurrentUrl(this.url), 300);

        const menu: Menu = this.menus[this.activeMenuIndex];
        if (!menu.children || menu.children.length === 0) {
            menu.routerLink && this.router.navigate([menu.routerLink]);
        } else {
            // if menu has children, enable the first submenu by default
            this.router.navigate([menu.children[0] && menu.children[0].routerLink]);
        }
    }

    activateSubMenu(index: number) {
        this.activeSubMenuIndex = index;
    }

    private activateMenuForCurrentUrl(url: string) {
        if (!url) {
            return;
        }
        const urlWithoutQueryParams = this.getUrlWithoutQueryParams(url);
        // find the index of url in the menu
        const menuIndex = this.menus.findIndex(
            menu => String(menu.routerLink) === String(urlWithoutQueryParams)
        );
        // find index of url in submenu (children)
        const subMenu = this.menus.find(
            m =>
                m.children &&
                m.children.some(
                    c => c.routerLink === urlWithoutQueryParams.slice(0, c.routerLink.length)
                )
        );
        const subMenuIndex =
            subMenu &&
            subMenu.children.findIndex(
                s => s.routerLink === urlWithoutQueryParams.slice(0, s.routerLink.length)
            );
        // if url is found in menu, set the index of active menu to the index of menu
        if (menuIndex > -1) {
            this.activeMenuIndex = menuIndex;
        }
        // if url is found in submenu, set the index of active submenu to index of url in submenu, then find and set the index
        // related to submenu in menu
        if (subMenuIndex > -1) {
            this.activeSubMenuIndex = subMenuIndex;
            this.setActiveMenuIndexContainingSubMenu(urlWithoutQueryParams);
        }
    }

    private setActiveMenuIndexContainingSubMenu(url: string) {
        this.menus.forEach((menu, index) => {
            const childFound =
                menu.children &&
                menu.children.some(c => c.routerLink === url.slice(0, c.routerLink.length));

            if (childFound) {
                this.activeMenuIndex = index;
            }
        });
    }

    private subsractText(longText: string, shortText: string): string {
        return longText.slice(shortText.length, longText.length);
    }

    private getUrlWithoutQueryParams(url: string) {
        return (url && url.substr(0, url.indexOf('?'))) || url;
    }
}
