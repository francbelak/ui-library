export default class {
  static parameters() {
    return {
      animations: {
        default: true,
        type: 'boolean',
      },
      initiallyExpanded: {
        default: true,
        type: 'boolean'
      }, label: {
        type: 'string'
      }
    };
  }

  static template() {
    return `
      <style>
        .tree-item {
          color: var(--font-color);
          display: flex;
          flex-wrap: wrap;
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
            z-index: 1;
          }
        }

        .item-more:checked + label {
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
