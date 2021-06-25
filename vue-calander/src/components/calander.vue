<template>
    <div class="root" v-click-outside>
        <div class="input">
            <input type="text" :value="formatdate" readonly>
        </div>
        <div class="content" v-if="isVisible">
            <div class="panel-top">
                <span @click="preMonth" class="ctrlBtn"><<</span>
                <span class="ctrlBtn"><</span>
                <span>{{formatdate}}</span>
                <span class="ctrlBtn">></span>
                <span @click="nextMonth" class="ctrlBtn">>></span>
            </div>
            <div class="main_panel">
                <div class="week-panel">
                    <span v-for="(item, index) in weeks" :key="index">{{item}}</span>
                </div>
                <div class="grides">
                    <div v-for="i in 6" :key="i+'_'" class="rows">
                        <span v-for=" y in 7" :key="y+'__'" class="cells" 
                        :class="[{notcurrentMonth : !iscurrentMonth(createItem[(i-1) * 7 + (y-1)])},{isToday:isToday(createItem[(i-1) * 7 + (y-1)])}]"  @click="focusCurren(createItem[(i-1) * 7 + (y-1)])">

                            {{createItem[(i-1) * 7 + (y-1)].getDate()}}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            isVisible:false,
            weeks:['日','一','二','三','四','五','六']
        }
    },
    props:['value'],
    methods:{
        show(){
            this.isVisible = true;
        },
        visible(){
            this.isVisible = false;
        },
        getYearMonthDay(date){
            let year = date.getFullYear();
            let month = date.getMonth();// 这里保持原始，只有在显示的时候+1
            let day = date.getDate();
            return {
                year,month,day
            }
        },
        // 判断是否是本月的日期
        iscurrentMonth(date){
            let {year,month,day} = this.getYearMonthDay(this.value);
            let {year:cYear,month:cMonth,day:cDay} = this.getYearMonthDay(date);
            return year == cYear && month == cMonth
        },
        // 判断是否是今天
        isToday(date){
            let {year,month,day} = this.getYearMonthDay(this.value);
            let {year:cYear,month:cMonth,day:cDay} = this.getYearMonthDay(date);
            return year == cYear && month == cMonth && day == cDay
        },
        // 点击某一天修改当前日期
        focusCurren(date){
            // 修改父组建传来的值
            this.$emit('input',date);
            this.visible();
        },
        // 上个月
        preMonth(){
            let {year,month} = this.getYearMonthDay(this.value);
            
            if(month < 0){
                year --
            } else {
                month --
            }
            let newDate = new Date(year,month,1);
            this.$emit('input',newDate)

        },
        // 下个月
        nextMonth(){
            let {year,month} = this.getYearMonthDay(this.value);
            if(month > 11 ){
                year ++
            } else {
                month ++
            }
            let newDate = new Date(year,month,1);
            this.$emit('input',newDate)
        }

    },
    computed:{
        formatdate(){ // 格式化输入框的时间显示
            let {year,month,day} = this.getYearMonthDay(this.value);
            return `${year}-${month+1}-${day}`
        },
        createItem(){
            // 创建日历中的每一天，（创建的日历为固定显示6*7=42天的形式）基本思路是
            // 得到每月第一天为周几，则当前日期向前移动几天为这一页日历的开始，循环42次则为当前页所有的item
            
            // 获取当前月份
            let {year,month} = this.getYearMonthDay(this.value);
            // 创建当前月份第一天的date对象
            let firstday = new Date(year,month,1);
            // 获取当前月份第一天是周几
            let startweek = firstday.getDay();
            // 向前移动，得到这一页开始的日期
            let startday = firstday - startweek * 24 * 60 * 60 * 1000;// 日期对象与毫秒值相减
            
            const dateArr = [];
            for(let i = 0;i<42;i++){
                dateArr.push(new Date(startday + (i * 24 * 60 * 60 * 1000)))
            };
            return dateArr;
        },
        
    },
    directives:{
        clickOutside:{
            bind(el,binding,vnode){
                let handel = (event) => {
                    if(el.contains(event.target)){
                        if(!vnode.context.isVisible)
                            vnode.context.show();
                    } else {
                        if(vnode.context.isVisible){
                            vnode.context.visible();
                        }
                    }
                }
                el.handel = handel
                document.addEventListener('click',handel,true)
            },
            unbind(el){
               document.removeEventListener('click',el.handel)
            }
        }
    }
    
}
</script>
<style lang="less" scoped>
    .flex {
        display: flex;
        justify-content: space-around;
    }
   .root {
       width: 300px;
        .panel-top {
            .flex
        }
        .ctrlBtn{
            cursor: pointer;
        }
        .main_panel {
            .week-panel {
                    .flex
                }
            .grides {
               .rows {
                   .flex;
                   margin-top: 5px;
               }
               .cells {
                   width: 30px;
                   height: 30px;
                   padding: 5px;
                   border-radius: 4px;
                   display: flex;
                   justify-content: center;
                   align-items: center;
                   background: #ccc;
                   user-select: none;
                   cursor: pointer;
                   &.notcurrentMonth {
                       background:#f1f0f0;
                       color: #ccc;
                   }
                   &.isToday {
                       background:pink
                   }
                   &:hover {
                       background: #ecd5d9;
                   }
               }
            }
        }
        
   }
</style>