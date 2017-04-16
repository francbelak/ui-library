export default class {
  static parameters() {
    return {
      animations: {
        default: true,
        type: 'boolean',
      },
      initiallyExpanded: {
        default: false,
        type: 'boolean'
      }, label: {
        type: 'string'
      }
    };
  }

  static template() {
    return `
      <style>
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

        .tree-item {
          color: var(--font-color);
          display: flex;
          flex-wrap: wrap;
          position: relative;
        }

        .tree-item.alarm .item-more + label{
          border-left: var(--tree-item-alarm-border-left-width) solid var(--alarm-color);
        }

        .tree-item .item-more + label.alarm-only:before,
        .tree-item .item-more + label.alarm-only:after {
          display: none;
        }

        .tree-item .item-more + label.alarm-only {
          width: 0;
        }

        .tree-item.alarm .item-more + label.alarm-only {
          border-left: var(--tree-item-alarm-border-left-width) solid var(--alarm-color);
        }

        .tree-item.alarm .item-more + label:after {
          background-image:url('data:image/false;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAyCAYAAACpgnCWAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAewgAAHsIBbtB1PgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAM6SURBVFiF7dZNbFRVGMbx/3tmmEqL1PkoLZ1mwI0bYqpJZ6QJUYiJHzTtpFZH0CprdeHChYmJSdUVQU1dG40aqlLE0jZUoom4AGEYiPiBEUiQDtChtJ1pxxanxXtfF21JaTulA5fdPJuTnHvz/O695ybnCEukkw0ej69si4FmoE7RtSAB0GGQAYQTquyfSk8cinF6Kl+PLDbZBuZhX6RFYZfAuqUeZCaXBXk3lw59EmOvdUuk118ftNXqAsIAK4OVBFueoGJzhJXVa/B4y/nj7Y+41PndYlgcs+KZ6PCRgbxI732RWttoH0i1x1fOhvdepyb2NGLMTU0X9/Txy6vv5H0rY9PQOHr81wXIgYpw1X+WJIAa3yO1RL7YiSfgnb6oSjrxO//8dZ5ryRTJjl4mr47kQwBSRlzhxpGjlwHcML0G1y35VqDGG36QjZ3tuFeVgir9u3s4+/6n/HvpylKl87PWVntPGzzaBrYA7PdHXhblc493NVuOdVIS8GJPTpHY8SaDP/xcSPnNUW2NZhIdcojN7qzv2jlgfW37W6x7KQqqxF94g8Hvj9w+MJ2/V6dLHzDj/onHgPX3VAUIvdgIQP/uHicAgPtHA7lNRtU0AQSffRIxBrVtzuz82AkAAJdtNxlgI0Dl4/UApI+eIpcacgxRqDeKBgFKQ9UAjP52xjFgJtUGIQBQUukHuNX/X3iESgNkAabSYwCsKL/XWUQZNSgp4MY6lKzxO4sIAwY4DXDhsy4mzl8k1fujswj8KT3eyHYVvnS6eTaCPm9yWH3AxF0yxt2YgyaWOTkmSvvdEAT9cGs6njUAOaxdwFWHjUE35gMAAxDLnBwzKi1A3n26wFy3jdm2NR3P3kAAGjPxwwqvAfYdApbAK83Dx36anViwx3f7wk+BfA2U3wYwLiKtTSPx7rmTZv5d0XTiIC5XnaL7CihX4Bvbsh6aD0CeI9Fsuvx1EbFNqwhRILRIc79Bui2xOppHThzP17MkMjcHKsJVX4VK9qK6CZHD25OTzzUMJZa18S/4XPnSMJS4kiwz2eQqF8kyk10uUBByJykiRaSIFJEiUkSKSBGB6UPc3NF5RET2AZmZcdn5HyCsH+5MzD5aAAAAAElFTkSuQmCC');
        }

        .item-more {
          display: none;
        }

        .item-more + label {
          background-color: var(--tree-background);
          border-bottom: var(--tree-item-border-bottom-width) solid var(--tree-item-border-bottom-color);
          position: relative;
          width: calc(var(--checkbox-width) + var(--tree-item-icon-width) + var(--text-padding-left));
        }

        .item-more + label:before,
        .item-more + label:after {
          background-position: center;
          background-repeat: no-repeat;
          content: '';
          height: 100%;
          position: absolute;
          top: 0;
        }

        .item-more + label:before {
          background-color: var(--checkbox-background);
          background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB3aWR0aD0iMjUiCiAgIGhlaWdodD0iMjUiCiAgIHZpZXdCb3g9IjAgMCAyNSAyNSIKICAgaWQ9InN2ZzYxMjIiCiAgIHZlcnNpb249IjEuMSIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMC45MSByMTM3MjUiCiAgIHNvZGlwb2RpOmRvY25hbWU9ImFycm93LWluYWN0aXZlLnN2ZyI+CiAgPGRlZnMKICAgICBpZD0iZGVmczYxMjQiIC8+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlkPSJiYXNlIgogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIKICAgICBib3JkZXJvcGFjaXR5PSIxLjAiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAuMCIKICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOnpvb209IjcuOTE5NTk1OSIKICAgICBpbmtzY2FwZTpjeD0iLTEwLjgyMTczNSIKICAgICBpbmtzY2FwZTpjeT0iLTEuNDA2MTQ1NSIKICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0icHgiCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ibGF5ZXIxIgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjEyODAiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iNzExIgogICAgIGlua3NjYXBlOndpbmRvdy14PSIxOTIwIgogICAgIGlua3NjYXBlOndpbmRvdy15PSIxIgogICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjEiCiAgICAgdW5pdHM9InB4IiAvPgogIDxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTYxMjciPgogICAgPHJkZjpSREY+CiAgICAgIDxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj4KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgICAgICA8ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+CiAgICAgICAgPGRjOnRpdGxlPjwvZGM6dGl0bGU+CiAgICAgIDwvY2M6V29yaz4KICAgIDwvcmRmOlJERj4KICA8L21ldGFkYXRhPgogIDxnCiAgICAgaW5rc2NhcGU6bGFiZWw9IkViZW5lIDEiCiAgICAgaW5rc2NhcGU6Z3JvdXBtb2RlPSJsYXllciIKICAgICBpZD0ibGF5ZXIxIgogICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTEwMjcuMzYyMikiPgogICAgPHBhdGgKICAgICAgIHNvZGlwb2RpOnR5cGU9InN0YXIiCiAgICAgICBzdHlsZT0ib3BhY2l0eToxO2ZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLWRhc2hvZmZzZXQ6MDtzdHJva2Utb3BhY2l0eTowLjk0MTE3NjQ3IgogICAgICAgaWQ9InBhdGg2NzE5IgogICAgICAgc29kaXBvZGk6c2lkZXM9IjMiCiAgICAgICBzb2RpcG9kaTpjeD0iLTEyLjUiCiAgICAgICBzb2RpcG9kaTpjeT0iLTEwMzcuNzc4OSIKICAgICAgIHNvZGlwb2RpOnIxPSI4LjMzMzMzMyIKICAgICAgIHNvZGlwb2RpOnIyPSI0LjE2NjY2NjUiCiAgICAgICBzb2RpcG9kaTphcmcxPSIwLjUyMzU5ODc4IgogICAgICAgc29kaXBvZGk6YXJnMj0iMS41NzA3OTYzIgogICAgICAgaW5rc2NhcGU6ZmxhdHNpZGVkPSJ0cnVlIgogICAgICAgaW5rc2NhcGU6cm91bmRlZD0iMCIKICAgICAgIGlua3NjYXBlOnJhbmRvbWl6ZWQ9IjAiCiAgICAgICBkPSJtIC01LjI4MzEyMTksLTEwMzMuNjEyMyAtMTQuNDMzNzU2MSwwIDcuMjE2ODc4LC0xMi41IHoiCiAgICAgICBpbmtzY2FwZTp0cmFuc2Zvcm0tY2VudGVyLXk9IjIuMDgzNTU5MiIKICAgICAgIHRyYW5zZm9ybT0ic2NhbGUoLTEsLTEpIiAvPgogIDwvZz4KPC9zdmc+Cg==);
          left: 0;
          width: var(--checkbox-width);
        }

        .item-more + label:after {
            background-image:url('data:image/false;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAyCAYAAACpgnCWAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAewgAAHsIBbtB1PgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAMySURBVFiF7djfb5NVHMfx9/f0WffD2E3ErWN1YAhupkYgYc0aydQLI2FuyyROl+wfMCbGC73wbuHGKFHxXr3zJyLMCe5uXEBmmcQsoUIlQZGxbsqwLQO6lp2vF51Ls+6ZGzy76+fmJCd5vq/zPOc55zx5hFUS/ibuD/jNc9bQK7AHpRHYDFwXmFL0Z1E5nsnZ0XhfOOdWR1bsHVQT3Z04oKqHELauNpDFXFPhYHO29dMjfbLwv0h0ONGk1h4D2gAaqit4vilA5JEa6qsrqPX7+Pj8DCOTmZWwmA956UxP65QrEhlO7DTWngS21Pp9vBGuZ1+oFrNsKD9eTXPwl6TrXVljOs92tUyUIG0n4kHfXTMOhJ7aVM17kRB1fh8ACpy/cYfLN+dJ3s7zw59pZufvuiEIJDGmbayr5RqAA8CgGpO/+B1C6MmHqvmo/VFqHIMCw1dSfPbbLDN38q5Fl0ehEWu/ZlA7GBRrAKK7LgyIEA34fbwfCVHjGHJWeSs2ybsT0+sCivJ0++5EP4A8OzrqZDPBS8C2d3YG6d5ahwJvxyY5MzN3L8WL83tVYPpxMz9X/wywbXOVw4vNdUDhEXkAADyWTQX3GlXTDfBCUwAjYBU+SVz3AijER7cBbQdob3gAgIkbt/k76/7mrDtK1KDSBNBY4wcgkcp6BxSyxVDYi3i4srAmZudLdoX7TYMBMgDpXKH4gxXGayRlgCSwNA+bKh2vkSmjEAc4/keKq7dynEre9Br5VaLfX+hX5QuvKy9F5BWTy/pPArc2iJhTxzdizvVtTyN6eCMEFT6M7d+RMQD5bOUh4C+PjRkc5wMAA3Cub3tajTkAuJ7T60wey6ux/TsySwhArKvlNKqvA/Y+gQURfe2n3idO/ddResYPXdyn6FdA7T0AcyoyEOtuHSruLFneYz2tI4Ldg3J0HcVV4FtjnV3LAXD7JFpM9FgiomIHEHqA5tLSXMEwJAvm87HelrNudVZFitN2Ih6s+vLwEUX2Cno62//my+Od4em1XLvmjWq8Mzzd0dGRWRxVZq0ArDAnG5EyUkbKSBkpI2WkjJQRKPxmKW69R0TkKPDPYrvm/AvC6BmMWeoNjAAAAABJRU5ErkJggg==');
            background-size: contain;
            left: calc(var(--checkbox-width) + var(--text-padding-left));
            width: var(--tree-item-icon-width);
        }

        .item-more:checked + label:before {
          background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB3aWR0aD0iMjUiCiAgIGhlaWdodD0iMjUiCiAgIHZpZXdCb3g9IjAgMCAyNSAyNSIKICAgaWQ9InN2ZzYxMjIiCiAgIHZlcnNpb249IjEuMSIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMC45MSByMTM3MjUiCiAgIHNvZGlwb2RpOmRvY25hbWU9ImFycm93LWFjdGl2ZS5zdmciPgogIDxkZWZzCiAgICAgaWQ9ImRlZnM2MTI0IiAvPgogIDxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBpZD0iYmFzZSIKICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiCiAgICAgYm9yZGVyb3BhY2l0eT0iMS4wIgogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiCiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIKICAgICBpbmtzY2FwZTp6b29tPSI3LjkxOTU5NTkiCiAgICAgaW5rc2NhcGU6Y3g9Ii0xMC44MjE3MzUiCiAgICAgaW5rc2NhcGU6Y3k9Ii0xLjQwNjE0NTUiCiAgICAgaW5rc2NhcGU6ZG9jdW1lbnQtdW5pdHM9InB4IgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9ImxheWVyMSIKICAgICBzaG93Z3JpZD0iZmFsc2UiCiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIxMjgwIgogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9IjcxMSIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iMTkyMCIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iMSIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIgogICAgIHVuaXRzPSJweCIgLz4KICA8bWV0YWRhdGEKICAgICBpZD0ibWV0YWRhdGE2MTI3Ij4KICAgIDxyZGY6UkRGPgogICAgICA8Y2M6V29yawogICAgICAgICByZGY6YWJvdXQ9IiI+CiAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+CiAgICAgICAgPGRjOnR5cGUKICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIiAvPgogICAgICAgIDxkYzp0aXRsZSAvPgogICAgICA8L2NjOldvcms+CiAgICA8L3JkZjpSREY+CiAgPC9tZXRhZGF0YT4KICA8ZwogICAgIGlua3NjYXBlOmxhYmVsPSJFYmVuZSAxIgogICAgIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiCiAgICAgaWQ9ImxheWVyMSIKICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC0xMDI3LjM2MjIpIj4KICAgIDxwYXRoCiAgICAgICBzb2RpcG9kaTp0eXBlPSJzdGFyIgogICAgICAgc3R5bGU9Im9wYWNpdHk6MTtmaWxsOiNmZmZmZmY7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjE7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MC45NDExNzY0NyIKICAgICAgIGlkPSJwYXRoNjcxOSIKICAgICAgIHNvZGlwb2RpOnNpZGVzPSIzIgogICAgICAgc29kaXBvZGk6Y3g9IjEyLjUiCiAgICAgICBzb2RpcG9kaTpjeT0iMTA0MS45NDU1IgogICAgICAgc29kaXBvZGk6cjE9IjguMzMzMzMzIgogICAgICAgc29kaXBvZGk6cjI9IjQuMTY2NjY2NSIKICAgICAgIHNvZGlwb2RpOmFyZzE9IjAuNTIzNTk4NzgiCiAgICAgICBzb2RpcG9kaTphcmcyPSIxLjU3MDc5NjMiCiAgICAgICBpbmtzY2FwZTpmbGF0c2lkZWQ9InRydWUiCiAgICAgICBpbmtzY2FwZTpyb3VuZGVkPSIwIgogICAgICAgaW5rc2NhcGU6cmFuZG9taXplZD0iMCIKICAgICAgIGQ9Im0gMTkuNzE2ODc4LDEwNDYuMTEyMiAtMTQuNDMzNzU2MSwwIDcuMjE2ODc4MSwtMTIuNSB6IgogICAgICAgaW5rc2NhcGU6dHJhbnNmb3JtLWNlbnRlci15PSItMi4wODM1MTg3IiAvPgogIDwvZz4KPC9zdmc+Cg==);
        }

        .slot-wrapper {
          width: calc(100% - var(--tree-intendation-width));
        }

        .nested-items-wrapper.no-animations {
          display: none;
        }

        .nested-items-wrapper {
          background-color: var(--tree-intendation-color);
          display: flex;
          justify-content: flex-end;
          width: 100%;
          z-index: 0;
        }

        .item-more:not(:checked).no-animations ~ .nested-items-wrapper {
          display: none;
        }

        .item-more:checked ~ .nested-items-wrapper {
          display: flex;
        }

        .item-label {
          background-color: var(--tree-background);
          border-bottom: var(--tree-item-border-bottom-width) solid var(--tree-item-border-bottom-color);
          flex-grow: 1;
          line-height: calc(var(--row-height) - var(--tree-item-border-bottom-width));
          padding: 0 0 0 var(--text-padding-left);
          position: relative;
        }

        .kpi-wrapper {
          background-color: var(--tree-background);
          border-bottom: var(--tree-item-border-bottom-width) solid var(--tree-item-border-bottom-color);
          display: flex;
          flex-direction: column;
          font-size: 0.7em;
          justify-content: space-around;
          padding: 0 8px 0 0;
          width: var(--kpi-width);
        }

        .kpi-inner {
          display: flex;
          height: 40px;
          flex-direction: column;
          justify-content: space-around;
        }

        .kpi-item {
          align-items: center;
          display: flex;
        }

        .kpi-unit {
          overflow: hidden;
          text-overflow: ellipsis;
          width: 30px;
        }

        .progress-bar {
          background-color: var(--progress-bar-inactive-color);
          flex-grow: 1;
          height: 7px;
        }

        .progress-bar--active {
          background-color: var(--progress-bar-active-color);
          height: 100%;
          width: 23%;
        }

        .tree-item-menu {
          background-color: var(--tree-item-menu-background-color);
          display: flex;
          height: calc(var(--row-height) - var(--tree-item-border-bottom-width));
          justify-content: flex-end;
          opacity: 0;
          pointer-events: none;
          position: absolute;
          right: 0;
          width: calc(100% - var(--tree-intendation-width));
        }

        .tree-item-menu.active {
          animation: fadeIn 1s ease-in forwards;
        }

        .tree-item-menu-item {
          width: var(--tree-item-menu-item-width);
          background-color: var(--tree-item-menu-item-background-color);
          background-position: center;
          background-repeat: no-repeat;
          background-size: 50%;
        }

        .tree-item-menu-item.open-chart {
          background-image: url('data:image/png;base64,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')
        }

        .tree-item-menu-item.open-history {
          background-image: url('data:image/png;base64,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')
        }

        .tree-item-menu-item.open-alarm {
          background-image: url('data:image/png;base64,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')
        }

        .tree-item-menu-item-wrapper {
          display: flex;
        }

        .tree-item-menu-item--active {
          background-color: var(--tree-item-menu-item-active-color);
          height: 100%;
          position: absolute;
          right: 0;
          width: var(--tree-item-menu-item-width);
        }
      </style>
      <div class="tree-item">
        <input type="checkbox" class="item-more" id="item-more">
        <label for="item-more"></label>
        <div class="item-label">{{label}}</div>
        <div class="kpi-wrapper">
          <div class="kpi-inner">
            <div class="kpi-item">
              <div class="kpi-unit">rpm</div>
              <!-- HACK: progress bar <progress> cannot be styled as requested -->
              <!-- TODO: check if this should be separate component -->
              <div class="progress-bar">
                <!-- TODO: data-width not accessible in css width attr(data-width) -->
                <!-- see: http://stackoverflow.com/questions/18300536/get-value-of-attribute-in-css -->
                <div class="progress-bar--active" data-width="23%"></div>
              </div>
            </div>
            <div class="kpi-item">
              <div class="kpi-unit">hp</div>
              <!-- HACK: progress bar <progress> cannot be styled as requested -->
              <!-- TODO: check if this should be separate component -->
              <div class="progress-bar">
                <div class="progress-bar--active" data-width="53"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="nested-items-wrapper">
          <div class="slot-wrapper">
            <slot name="tree-items-nested"></slot>
          </div>
        </div>
        <div class="tree-item-menu">
          <div class="tree-item-menu-item--active"></div>
          <div class="tree-item-menu-item-wrapper">
            <div class="tree-item-menu-item open-chart"></div>
            <div class="tree-item-menu-item open-history"></div>
            <div class="tree-item-menu-item open-alarm"></div>
          </div>
        </div>
      </div>
    `;
  }

  _attachAnimations() {
    if (this.initiallyExpanded)
      this.$(this.shadowRoot.querySelectorAll('.item-more')).prop('checked', true);
    else
      this.$(this.shadowRoot.querySelectorAll('.nested-items-wrapper')).hide();

    this.$(this.shadowRoot.querySelectorAll('label')).on('click', (e) => {
      this.$(this.shadowRoot.querySelectorAll('.nested-items-wrapper')).slideToggle();
    });
  }

  _removeSubBrowsing() {
    this.$(this.shadowRoot.querySelectorAll('.item-more + label')).addClass('alarm-only');
  }

  createdCallback() {
    if (this.animations)
      this._attachAnimations();
    else {
      if (this.initiallyExpanded)
        this.$(this.shadowRoot.querySelectorAll('.item-more')).addClass('no-animations').prop('checked', true);
      else
        this.$(this.shadowRoot.querySelectorAll('.nested-items-wrapper')).addClass('no-animations');
    }

    if (this.shadowRoot.querySelectorAll('slot')[0].assignedNodes().length === 0)
      this._removeSubBrowsing();
  }
}
