const app = new Vue({
    el: '#app',
    data: {
        you: 100,
        monster: 100,
        attackLog: [],
        showControls: false
    },
    methods: {
        randomNum: function () {
            return Math.floor((Math.random() * 10) + 1);
        },
        doAction: function (u, m, h) {
            this.you += u;
            if (u <= -1) {
                this.attackLog.unshift({
                    isPlayer: false,
                    text: `Monster hits you for ${Math.abs(u)}`
                });
            }
            this.monster += m;
            if (m <= -1) {
                this.attackLog.unshift({
                    isPlayer: true,
                    text: `You hit Monster for ${Math.abs(m)}`
                })
            }
            this.you += h
            if (h >= 1) {
                this.attackLog.unshift({
                    isPlayer: true,
                    text: `You heal for ${h}`
                })
            }
        },
        attack: function () {
            let uAttk = parseInt('-' + this.randomNum());
            let mAttk = parseInt('-' + this.randomNum());
            let uHeal = 0;
            this.doAction(uAttk, mAttk, uHeal);
        },
        toggleActions: function () {
            this.showControls = !this.showControls;
        },
        specialAttack: function () {
            let mAttk = parseInt('-' + (this.randomNum() + this.randomNum()));
            let uAttk = parseInt('-' + this.randomNum());
            let uHeal = 0;
            this.doAction(uAttk, mAttk, uHeal)
        },
        heal: function () {
            if (this.you <= 90) {
                let uHeal = this.randomNum();
                let uAttk = parseInt('-' + this.randomNum());
                let mAttk = 0;
                this.doAction(uAttk, mAttk, uHeal)
            }
        },
        giveUp: function () {
            if (confirm(`You Are Going To Let The Monster Win!`)) {
                this.youLose();
            }
        },
        youLose: function () {
            alert('You Lose.');
            this.toggleActions();
            return;
        },
        youWin: function () {
            alert('You Win!');
            this.toggleActions();
        },
        startNewGame: function () {
            this.you = 100;
            this.monster = 100;
            if (!this.showControls) {
                this.toggleActions();
                this.attackLog = [];
            }
        }
    },
    watch: {
        you: function () {
            if (this.you < 1) {
                this.youLose();
                return;
            }
        },
        monster: function () {
            if (this.monster < 1) {
                this.youWin();
            }
        }
    }
});