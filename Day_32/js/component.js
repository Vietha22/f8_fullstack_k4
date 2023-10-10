F8.component("counter-app", {
  data: () => ({
    count: 0,
    title: "Counter App",
    text: "Fullstack - F8 - MouseOver",
  }),
  template: `
  <h1>{{ title }}</h1>
  <h2>Đã đếm: {{ count }} lần</h2>
  <div v-on:mouseover="event.target.style.border='1px solid red'">{{ text }}</div>
  <button v-on:click="count--">-</button>
  <button v-on:click="count++">+</button>
  <button v-on:click="title='Xin chào F8'">Change Title</button>
  `,
});

F8.component("header-component", {
  template: `<h1>HEADER</h1>`,
});
